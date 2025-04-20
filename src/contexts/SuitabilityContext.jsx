import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  calculatePerviousScore,
  evaluateSoilParams,
  bufferCheck,
  fetchSolarData,
  fetchAirQualityData,
  normalizeScores
} from '../utils/siteUtils';

const defaultParameters = {
  region: 'India',
  gridSize: 1, 
  includeFactors: {
    landCover: true,
    soil: true,
    buffer: true,
    solar: true,
    airQuality: true,
  },
  weights: {
    landCover: 0.3,
    soil: 0.3,
    buffer: 0.2,
    solar: 0.1,
    airQuality: 0.1,
  },
};

const SuitabilityContext = createContext(undefined);

export const useSuitability = () => {
  const context = useContext(SuitabilityContext);
  if (context === undefined) {
    throw new Error('useSuitability must be used within a SuitabilityProvider');
  }
  return context;
};

export const SuitabilityProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [parameters, setParameters] = useState(defaultParameters);

  const navigate = useNavigate();

  const runAnalysis = async () => {
    setAnalyzing(true);
    setLoading(true);

    try {
      const solarExposure = await fetchSolarData(selectedCell.coordinates.lat, selectedCell.coordinates.lng);
      const airQualityIndex = await fetchAirQualityData(selectedCell.coordinates.lat, selectedCell.coordinates.lng);

      const landCoverScore = calculatePerviousScore(await fetchOsmLandCover(selectedCell.coordinates));
      const soilScore = evaluateSoilParams(await fetchSoilData(selectedCell.coordinates));
      const bufferScore = bufferCheck(selectedCell.coordinates, parameters.buffer);

      const suitabilityScore = (landCoverScore * parameters.weights.landCover) +
        (soilScore * parameters.weights.soil) +
        (bufferScore * parameters.weights.buffer) +
        (solarExposure * parameters.weights.solar) +
        (airQualityIndex * parameters.weights.airQuality);

      setResults({
        suitabilityScore,
        factors: {
          landCover: landCoverScore,
          soil: soilScore,
          buffer: bufferScore,
          solar: solarExposure,
          airQuality: airQualityIndex,
        }
      });
      
      navigate('/results');
    } catch (error) {
      console.error('Error running analysis:', error);
      const mockResults = generateMockResults();
      setResults(mockResults);
      navigate('/results');
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  const selectCell = (cell) => {
    setSelectedCell(cell);
  };

  const generateMockResults = () => {
    const results = [];
    const centerLat = 20.5937;
    const centerLng = 78.9629;

    for (let i = 0; i < 100; i++) {
      const latOffset = (Math.random() - 0.5) * 10;
      const lngOffset = (Math.random() - 0.5) * 10;

      const landCover = Math.random();
      const soil = Math.random();
      const buffer = Math.random();
      const solar = Math.random();
      const airQuality = Math.random();

      const suitabilityScore =
        landCover * parameters.weights.landCover +
        soil * parameters.weights.soil +
        buffer * parameters.weights.buffer +
        solar * parameters.weights.solar +
        airQuality * parameters.weights.airQuality;

      results.push({
        id: `cell-${i}`,
        coordinates: {
          lat: centerLat + latOffset,
          lng: centerLng + lngOffset,
        },
        suitabilityScore,
        factors: {
          landCover,
          soil,
          buffer,
          solar,
          airQuality
        },
      });
    }

    return results;
  };

  return (
    <SuitabilityContext.Provider
      value={{
        loading,
        analyzing,
        results,
        selectedCell,
        parameters,
        setParameters,
        runAnalysis,
        selectCell,
      }}
    >
      {children}
    </SuitabilityContext.Provider>
  );
};

import React, { useState, useCallback, useEffect } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  HeatmapLayer,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { useSuitability } from '../contexts/SuitabilityContext';
import MapLoadingSpinner from './MapLoadingSpinner';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const googleMapsLibraries = ['visualization'];

const GoogleMapComponent = ({ height = '600px' }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries,
  });

  const {
    results,
    selectedCell,
    selectCell,
    parameters,
  } = useSuitability();

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [clickedLocation, setClickedLocation] = useState(null);
  const [clickedScore, setClickedScore] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn('Location permission denied or failed:', err);
      }
    );
  }, []);

  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const getHeatmapData = useCallback(() => {
    if (!results) return [];
    return results.map((cell) => ({
      location: new google.maps.LatLng(cell.coordinates.lat, cell.coordinates.lng),
      weight: cell.suitabilityScore * 10,
    }));
  }, [results]);

  const handleCellClick = (cell) => {
    selectCell(cell);
    if (map) {
      map.panTo({ lat: cell.coordinates.lat, lng: cell.coordinates.lng });
    }
  };

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setClickedLocation({ lat, lng });

    const mockScore = generateSuitabilityScore(lat, lng);
    setClickedScore(mockScore);

    if (map) {
      map.panTo({ lat, lng });
    }
  };

  const generateSuitabilityScore = (lat, lng) => {
    const rand = () => Math.random();
    const { weights } = parameters;

    const landCover = rand();
    const soil = rand();
    const buffer = rand();
    const solar = rand();

    return {
      score:
        landCover * weights.landCover +
        soil * weights.soil +
        buffer * weights.buffer +
        solar * weights.solar,
      factors: { landCover, soil, buffer, solar },
    };
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: false,
    mapTypeId: 'terrain',
  };

  const heatmapOptions = {
    radius: 20,
    opacity: 0.8,
    gradient: [
      'rgba(0, 255, 0, 0)',
      'rgba(0, 255, 0, 1)',
      'rgba(173, 255, 47, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(255, 165, 0, 1)',
      'rgba(255, 0, 0, 1)',
    ],
  };

  if (loadError) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
        style={{ height }}
      >
        <p className="text-error-600 dark:text-error-400">
          Failed to load Google Maps: {loadError.message}
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
        style={{ height }}
      >
        <MapLoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        options={mapOptions}
        onLoad={onMapLoad}
        onClick={handleMapClick}
      >
        {results && (
          <>
            <HeatmapLayer data={getHeatmapData()} options={heatmapOptions} />

            {results.map((cell) => (
              <Marker
                key={cell.id}
                position={{
                  lat: cell.coordinates.lat,
                  lng: cell.coordinates.lng,
                }}
                opacity={0}
                onClick={() => handleCellClick(cell)}
              />
            ))}

            {selectedCell && (
              <Marker
                position={{
                  lat: selectedCell.coordinates.lat,
                  lng: selectedCell.coordinates.lng,
                }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: '#059669',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
              />
            )}
          </>
        )}

        {clickedLocation && clickedScore && (
          <Marker position={clickedLocation}>
            <InfoWindow position={clickedLocation} onCloseClick={() => setClickedLocation(null)}>
              <div className="text-sm p-3 rounded-md shadow-md bg-white dark:bg-gray-800 text-black dark:text-white">
                <h2 className="font-semibold">Suitability Score: {clickedScore.score.toFixed(2)}</h2>
                <p>Land Cover: {clickedScore.factors.landCover.toFixed(2)}</p>
                <p>Soil: {clickedScore.factors.soil.toFixed(2)}</p>
                <p>Buffer: {clickedScore.factors.buffer.toFixed(2)}</p>
                <p>Solar: {clickedScore.factors.solar.toFixed(2)}</p>
              </div>
            </InfoWindow>
          </Marker>
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;

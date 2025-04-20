import React from 'react';
import { useSuitability } from '../contexts/SuitabilityContext';
import { Leaf, Cloud, Droplet, Sun } from 'lucide-react';

const AnalysisParameters = () => {
  const { parameters, setParameters, analyzing } = useSuitability();

  const handleWeightChange = (factor, value) => {
    setParameters(prev => ({
      ...prev,
      weights: {
        ...prev.weights,
        [factor]: value
      }
    }));
  };

  const handleIncludeChange = (factor) => {
    setParameters(prev => ({
      ...prev,
      includeFactors: {
        ...prev.includeFactors,
        [factor]: !prev.includeFactors[factor]
      }
    }));
  };

  const handleGridSizeChange = (e) => {
    setParameters(prev => ({
      ...prev,
      gridSize: Number(e.target.value)
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-heading font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Analysis Parameters
      </h3>

      <div className="mb-6">
        <label htmlFor="gridSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Grid Cell Size
        </label>
        <select
          id="gridSize"
          value={parameters.gridSize}
          onChange={handleGridSizeChange}
          disabled={analyzing}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50"
        >
          <option value={0.5}>0.5 km²</option>
          <option value={1}>1 km²</option>
          <option value={2}>2 km²</option>
          <option value={5}>5 km²</option>
        </select>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Smaller grid cells provide more detailed results but require more processing time.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Include Factors
        </h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              id="include-landcover"
              type="checkbox"
              checked={parameters.includeFactors.landCover}
              onChange={() => handleIncludeChange('landCover')}
              disabled={analyzing}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="include-landcover" className="ml-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
              <Leaf className="h-4 w-4 text-forest-600 dark:text-forest-400 mr-1" />
              Land Cover
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="include-soil"
              type="checkbox"
              checked={parameters.includeFactors.soil}
              onChange={() => handleIncludeChange('soil')}
              disabled={analyzing}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="include-soil" className="ml-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
              <Cloud className="h-4 w-4 text-earth-600 dark:text-earth-400 mr-1" />
              Soil Quality
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="include-buffer"
              type="checkbox"
              checked={parameters.includeFactors.buffer}
              onChange={() => handleIncludeChange('buffer')}
              disabled={analyzing}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="include-buffer" className="ml-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
              <Droplet className="h-4 w-4 text-secondary-600 dark:text-secondary-400 mr-1" />
              Buffer Zones
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="include-solar"
              type="checkbox"
              checked={parameters.includeFactors.solar}
              onChange={() => handleIncludeChange('solar')}
              disabled={analyzing}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="include-solar" className="ml-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
              <Sun className="h-4 w-4 text-accent-600 dark:text-accent-400 mr-1" />
              Solar Exposure
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Factor Weights
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Adjust the importance of each factor in the overall suitability score.
        </p>
        <div className="space-y-4">
          {/* Land Cover Weight */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="weight-landcover" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <Leaf className="h-4 w-4 text-forest-600 dark:text-forest-400 mr-1" />
                Land Cover
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(parameters.weights.landCover * 100)}%
              </span>
            </div>
            <input
              id="weight-landcover"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={parameters.weights.landCover}
              onChange={(e) => handleWeightChange('landCover', parseFloat(e.target.value))}
              disabled={!parameters.includeFactors.landCover || analyzing}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 disabled:opacity-50"
            />
          </div>

          {/* Soil Weight */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="weight-soil" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <Cloud className="h-4 w-4 text-earth-600 dark:text-earth-400 mr-1" />
                Soil Quality
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(parameters.weights.soil * 100)}%
              </span>
            </div>
            <input
              id="weight-soil"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={parameters.weights.soil}
              onChange={(e) => handleWeightChange('soil', parseFloat(e.target.value))}
              disabled={!parameters.includeFactors.soil || analyzing}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 disabled:opacity-50"
            />
          </div>

          {/* Buffer Weight */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="weight-buffer" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <Droplet className="h-4 w-4 text-secondary-600 dark:text-secondary-400 mr-1" />
                Buffer Zones
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(parameters.weights.buffer * 100)}%
              </span>
            </div>
            <input
              id="weight-buffer"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={parameters.weights.buffer}
              onChange={(e) => handleWeightChange('buffer', parseFloat(e.target.value))}
              disabled={!parameters.includeFactors.buffer || analyzing}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 disabled:opacity-50"
            />
          </div>

          {/* Solar Weight */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="weight-solar" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <Sun className="h-4 w-4 text-accent-600 dark:text-accent-400 mr-1" />
                Solar Exposure
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(parameters.weights.solar * 100)}%
              </span>
            </div>
            <input
              id="weight-solar"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={parameters.weights.solar}
              onChange={(e) => handleWeightChange('solar', parseFloat(e.target.value))}
              disabled={!parameters.includeFactors.solar || analyzing}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisParameters;
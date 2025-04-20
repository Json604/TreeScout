import React from 'react';
import { X, Leaf, Cloud, Crop as Drop, Sun } from 'lucide-react';
import { useSuitability } from '../contexts/SuitabilityContext';


const AnalysisSidebar = ({ onClose }) => {
  const { selectedCell } = useSuitability();

  if (!selectedCell) {
    return null;
  }

  const { coordinates, suitabilityScore, factors } = selectedCell;

  const formatPercentage = (value) => `${Math.round(value * 100)}%`;

  const getScoreColorClass = (score) => {
    if (score >= 0.7) return 'text-success-600 dark:text-success-400';
    if (score >= 0.4) return 'text-warning-600 dark:text-warning-400';
    return 'text-error-600 dark:text-error-400';
  };

  const getProgressColorClass = (score) => {
    if (score >= 0.7) return 'bg-success-500';
    if (score >= 0.4) return 'bg-warning-500';
    return 'bg-error-500';
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all animate-slide-up">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-heading font-semibold text-gray-800 dark:text-gray-100">
          Site Analysis
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
          <p className="text-sm text-gray-800 dark:text-gray-200">
            Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Suitability</h4>
          <div className="flex items-center mt-1">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
              <div
                className={`h-2.5 rounded-full ${getProgressColorClass(suitabilityScore)}`}
                style={{ width: `${suitabilityScore * 100}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${getScoreColorClass(suitabilityScore)}`}>
              {formatPercentage(suitabilityScore)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Factor Scores</h4>

          {/* Land Cover Factor */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center mb-2">
              <Leaf className="h-5 w-5 text-forest-600 dark:text-forest-400 mr-2" />
              <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">Land Cover</h5>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                <div
                  className={`h-2.5 rounded-full ${getProgressColorClass(factors.landCover)}`}
                  style={{ width: `${factors.landCover * 100}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getScoreColorClass(factors.landCover)}`}>
                {formatPercentage(factors.landCover)}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              {factors.landCover >= 0.7
                ? 'Excellent vegetation potential with minimal existing coverage.'
                : factors.landCover >= 0.4
                ? 'Moderate vegetation potential with some existing coverage.'
                : 'Poor vegetation potential or heavily developed area.'}
            </p>
          </div>

          {/* Soil Factor */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center mb-2">
              <Cloud className="h-5 w-5 text-earth-600 dark:text-earth-400 mr-2" />
              <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">Soil Quality</h5>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                <div
                  className={`h-2.5 rounded-full ${getProgressColorClass(factors.soil)}`}
                  style={{ width: `${factors.soil * 100}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getScoreColorClass(factors.soil)}`}>
                {formatPercentage(factors.soil)}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              {factors.soil >= 0.7
                ? 'Excellent soil composition with good drainage and nutrient content.'
                : factors.soil >= 0.4
                ? 'Moderate soil quality with adequate nutrient availability.'
                : 'Poor soil quality with low nutrient content or drainage issues.'}
            </p>
          </div>

          {/* Buffer Factor */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center mb-2">
              <Drop className="h-5 w-5 text-secondary-600 dark:text-secondary-400 mr-2" />
              <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">Buffer Zones</h5>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                <div
                  className={`h-2.5 rounded-full ${getProgressColorClass(factors.buffer)}`}
                  style={{ width: `${factors.buffer * 100}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getScoreColorClass(factors.buffer)}`}>
                {formatPercentage(factors.buffer)}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              {factors.buffer >= 0.7
                ? 'No conflicts with existing infrastructure or protected areas.'
                : factors.buffer >= 0.4
                ? 'Some minor conflicts with infrastructure or protected zones.'
                : 'Major conflicts with existing infrastructure or protected areas.'}
            </p>
          </div>

          {/* Solar Factor */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center mb-2">
              <Sun className="h-5 w-5 text-accent-600 dark:text-accent-400 mr-2" />
              <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">Solar Exposure</h5>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                <div
                  className={`h-2.5 rounded-full ${getProgressColorClass(factors.solar)}`}
                  style={{ width: `${factors.solar * 100}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${getScoreColorClass(factors.solar)}`}>
                {formatPercentage(factors.solar)}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              {factors.solar >= 0.7
                ? 'Optimal solar radiation for tree growth.'
                : factors.solar >= 0.4
                ? 'Adequate solar radiation for most tree species.'
                : 'Insufficient solar radiation for optimal tree growth.'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full py-2 px-4 rounded bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Generate Detailed Report
        </button>
      </div>
    </div>
  );
};

export default AnalysisSidebar;
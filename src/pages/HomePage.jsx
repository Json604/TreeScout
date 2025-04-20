import React, { useEffect, useState } from 'react';
import { Leaf, ArrowRight } from 'lucide-react';
import { useSuitability } from '../contexts/SuitabilityContext';
import AnalysisParameters from '../components/AnalysisParameters';

const HomePage = () => {
  const { runAnalysis, analyzing, suitabilityData } = useSuitability();
  const [results, setResults] = useState(null);

  // Fetch data for tree planting results 
  useEffect(() => {
    if (suitabilityData) {
      setResults(suitabilityData); 
    }
  }, [suitabilityData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Find the Perfect Spots for
            <span className="text-primary-600 dark:text-primary-400"> Tree Planting</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Identify optimal tree planting locations across India using advanced environmental and geographical data analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Analysis Configuration */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-heading font-semibold text-gray-800 dark:text-gray-100 mb-4">
                How It Works
              </h2>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Configure Analysis</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Set parameters like grid size and factor weights to customize your analysis.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Run Analysis</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our system processes multiple data sources including land cover, soil quality, and solar exposure.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">View Results</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Explore the interactive heatmap showing suitability scores across the region.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-3">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Detailed Insights</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Click on any location to see detailed factor scores and analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <AnalysisParameters />
          </div>

          {/* Right Column - Run Analysis */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Ready to Discover Optimal Planting Sites?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Click the button below to start the analysis. Our system will process multiple environmental
                  factors to identify the most suitable tree planting locations across India.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Leaf className="h-5 w-5 text-success-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">Environmental Impact</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Strategically placed trees can significantly reduce carbon footprint and improve air quality.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Leaf className="h-5 w-5 text-success-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">Scientific Approach</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our analysis combines satellite imagery, soil data, and geographic information for accurate results.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Leaf className="h-5 w-5 text-success-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">High Success Rate</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Trees planted in optimal locations have up to 80% higher survival rates and better growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={runAnalysis}
                disabled={analyzing}
                className="group w-full flex items-center justify-center py-3 px-4 rounded-md bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {analyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Run Analysis
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>

            {/* Dynamic Result Display */}
            {results && (
              <div className="bg-forest-50 dark:bg-forest-900/30 rounded-lg p-5 border border-forest-200 dark:border-forest-800">
                <h3 className="text-forest-800 dark:text-forest-200 font-medium mb-2">
                  Tree Planting Results
                </h3>
                <p className="text-forest-700 dark:text-forest-300 text-sm">
                  Suitable sites have been identified based on environmental factors such as soil quality, solar exposure, and land cover.
                </p>
                {/* Display the results */}
                <pre className="text-sm text-gray-600 dark:text-gray-400">{JSON.stringify(results, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { TreePine, Leaf, Database, Map } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">
            About TreeScout
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-400 mx-auto">
            Our mission, methodology, and the technology behind our site suitability analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <TreePine className="h-6 w-6 text-primary-600 dark:text-primary-500 mr-2" />
                <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-gray-100">Our Mission</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TreeScout was created to optimize reforestation efforts across India through data-driven site selection.
                By identifying the most suitable locations for tree planting, we aim to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Increase tree planting success rates by up to 80%</li>
                <li>Maximize carbon sequestration potential</li>
                <li>Enhance biodiversity and ecosystem restoration</li>
                <li>Support local communities through sustainable forestry</li>
                <li>Combat climate change through strategic reforestation</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Leaf className="h-6 w-6 text-primary-600 dark:text-primary-500 mr-2" />
                <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-gray-100">Our Approach</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We combine cutting-edge geospatial technology with environmental science to analyze multiple factors
                affecting tree planting success:
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-forest-100 dark:bg-forest-900 flex items-center justify-center text-forest-600 dark:text-forest-400 mr-3">
                    <span className="text-xs">1</span>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">Land Cover Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Using Sentinel-2 imagery to assess current vegetation, urban areas, and available planting space.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-earth-100 dark:bg-earth-900 flex items-center justify-center text-earth-600 dark:text-earth-400 mr-3">
                    <span className="text-xs">2</span>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">Soil Suitability</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Evaluating soil texture, pH, organic content, and moisture retention capabilities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center text-secondary-600 dark:text-secondary-400 mr-3">
                    <span className="text-xs">3</span>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">Buffer Zone Protection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Identifying safe distances from infrastructure, protected areas, and existing forests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-accent-100 dark:bg-accent-900 flex items-center justify-center text-accent-600 dark:text-accent-400 mr-3">
                    <span className="text-xs">4</span>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">Solar Radiation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Calculating optimal sun exposure for different tree species and growth stages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="mb-16">
          <div className="flex items-center mb-6">
            <Map className="h-6 w-6 text-primary-600 dark:text-primary-500 mr-2" />
            <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-gray-100">The Impact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-forest-50 dark:bg-forest-900/30 rounded-lg p-5 border border-forest-200 dark:border-forest-800">
              <h3 className="text-forest-800 dark:text-forest-200 font-medium mb-2">Environmental Benefits</h3>
              <p className="text-forest-700 dark:text-forest-300 text-sm">
                Properly placed trees can sequester up to 48 pounds of CO₂ annually, reduce soil erosion by up to 75%, and increase biodiversity in restored ecosystems.
              </p>
            </div>

            <div className="bg-earth-50 dark:bg-earth-900/30 rounded-lg p-5 border border-earth-200 dark:border-earth-800">
              <h3 className="text-earth-800 dark:text-earth-200 font-medium mb-2">Economic Value</h3>
              <p className="text-earth-700 dark:text-earth-300 text-sm">
                Strategic reforestation can reduce planting costs by 30%, increase tree survival rates, and create sustainable forestry opportunities for local communities.
              </p>
            </div>

            <div className="bg-secondary-50 dark:bg-secondary-900/30 rounded-lg p-5 border border-secondary-200 dark:border-secondary-800">
              <h3 className="text-secondary-800 dark:text-secondary-200 font-medium mb-2">Climate Resilience</h3>
              <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                Optimally placed forests help mitigate climate change, reduce urban heat islands by up to 4°C, and protect watersheds for improved water security.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
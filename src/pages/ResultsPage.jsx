import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, Layers } from 'lucide-react';
import { useSuitability } from '../contexts/SuitabilityContext';
import GoogleMapComponent from '../components/GoogleMap';
import AnalysisSidebar from '../components/AnalysisSidebar';
import MapLoadingSpinner from '../components/MapLoadingSpinner';

const ResultsPage= () => {
  const { results, loading, selectedCell, selectCell } = useSuitability();
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCell) {
      setShowSidebar(true);
    }
  }, [selectedCell]);
  
  // If no results are available, redirect to notfoundPage
  useEffect(() => {
    if (!results && !loading) {
      navigate('*');
    }
  }, [results, loading, navigate]);
  
  const handleCloseSidebar = () => {
    setShowSidebar(false);
    selectCell(null);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <MapLoadingSpinner />
          <h2 className="mt-6 text-xl font-heading font-semibold text-gray-900 dark:text-gray-100">
            Analyzing site suitability data...
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This may take a moment as we process multiple environmental factors.
          </p>
        </div>
      </div>
    );
  }
  
  if (!results) {
    return null; 
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-3 md:space-y-0">
          <div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Analysis
            </button>
            <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mt-1">
            Click on any location on the map to view detailed suitability scores.
            </h1>
          </div>
          
        </div>
        
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 mb-8">
          <div className={`lg:flex-1 transition-all duration-300 ease-in-out ${showSidebar ? 'lg:w-3/4' : 'lg:w-full'}`}>
            <GoogleMapComponent height="70vh" />
          </div>
          
          {showSidebar && (
            <div className="lg:w-1/4">
              <AnalysisSidebar onClose={handleCloseSidebar} />
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Analysis Summary
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Sites Analyzed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{results.length}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Highly Suitable Sites</p>
              <p className="text-2xl font-semibold text-success-600 dark:text-success-400">
                {results.filter(cell => cell.suitabilityScore >= 0.7).length}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Moderately Suitable</p>
              <p className="text-2xl font-semibold text-warning-600 dark:text-warning-400">
                {results.filter(cell => cell.suitabilityScore >= 0.4 && cell.suitabilityScore < 0.7).length}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Low Suitability</p>
              <p className="text-2xl font-semibold text-error-600 dark:text-error-400">
                {results.filter(cell => cell.suitabilityScore < 0.4).length}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">
              Suitability Scale
            </h3>
            <div className="flex items-center">
              <div className="w-full h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Low Suitability</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Moderate</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">High Suitability</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ResultsPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-16 transition-colors duration-200">
      <TreePine className="h-16 w-16 text-primary-500 mb-6" />

      <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-10">
        Please run analysis on the home page to generate the results.
      </h1>

      <Link
        to="/"
        className="inline-flex items-center px-5 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
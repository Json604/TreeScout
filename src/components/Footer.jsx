import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <TreePine className="h-6 w-6 text-primary-600 dark:text-primary-500" />
              <span className="ml-2 text-lg font-heading font-bold text-forest-800 dark:text-forest-300">
                TreeScout
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md">
              Advanced analysis tool for identifying optimal tree planting sites 
              across India using environmental and geographical data.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider mb-2 md:mb-0">
            Made with ❤️ by Kartikey
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} TreeScout. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
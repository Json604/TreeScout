import React from 'react';
import { TreePine } from 'lucide-react';

const MapLoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-leaf-sway">
        <TreePine className="h-12 w-12 text-primary-500" />
      </div>
      <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
        Loading map...
      </p>
    </div>
  );
};

export default MapLoadingSpinner;
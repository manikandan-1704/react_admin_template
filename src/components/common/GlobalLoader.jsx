import React from 'react';
import { useSelector } from 'react-redux';

const GlobalLoader = () => {
  const loading = useSelector((state) => state.ui.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default GlobalLoader;

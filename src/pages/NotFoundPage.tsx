import { AlertTriangle } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 text-center">
      <AlertTriangle size={64} className="mx-auto mb-6 text-yellow-500" />
      <h1 className="mb-3 text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mb-8 text-gray-600">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
};
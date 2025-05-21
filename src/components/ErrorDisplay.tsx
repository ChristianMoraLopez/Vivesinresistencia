import React from 'react';
import {Card} from './ui/card';

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Card className="mt-6 max-w-lg mx-auto" >
      <p className="text-red-600">{error}</p>
    </Card>
  );
};

export default ErrorDisplay;
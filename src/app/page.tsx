'use client'
// app/page.tsx
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import PredictionForm from '../components/PredictionForm';
import ErrorDisplay from '../components/ErrorDisplay';
import PredictionResults from '../components/PredictionResults';
import SensitivityAnalysis from '../components/SensitivityAnalysis';
import usePrediction from '../hooks/usePrediction';

const HomePage: React.FC = () => {
  const { prediction, sensitivity, loading, error, submitPrediction } = usePrediction();

  return (
    <MainLayout>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PredictionForm onSubmit={submitPrediction} loading={loading} />
          <ErrorDisplay error={error} />
          {prediction && <PredictionResults prediction={prediction} />}
          <SensitivityAnalysis sensitivity={sensitivity} />
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
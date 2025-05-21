'use client'
// hooks/usePrediction.ts
import { useState } from 'react';

// Interface for prediction data based on backend response
export interface PredictionResponse {
  prediccion: boolean;
  probabilidad: number;
  homa_ir: number;
  categoria: string;
  nivel_riesgo: string;
  sensibilidad: {
    glucosa: number;
    imc: number;
    cintura: number;
    glucosa_imc: number;
    glucosa_cintura: number;
    imc_cintura: number;
  };
  recomendaciones: string[];
  error: string;
}

// Interface for sensitivity analysis response
export interface SensitivityResponse {
  resultados: {
    matriz_glucosa_imc: number[][];
    matriz_glucosa_cintura: number[][];
    matriz_imc_cintura: number[][];
  };
  ejes: {
    glucosa: number[];
    imc: number[];
    cintura: number[];
  };
  error: string;
}

// Interface for input data to match backend PredictionSchema
export interface PredictionInput {
  genero: number;
  edad: number;
  glucosa: number;
  insulina: number;
  imc: number;
  cintura: number;
}

const usePrediction = () => {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [sensitivity, setSensitivity] = useState<SensitivityResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Get API URL from environment variable with a fallback
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

  const submitPrediction = async (data: PredictionInput) => {
    setLoading(true);
    setError('');
    setPrediction(null);
    setSensitivity(null);

    try {
      // Send prediction request
      const predictResponse = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!predictResponse.ok) {
        throw new Error('Error en la predicción');
      }

      const predictData: PredictionResponse = await predictResponse.json();
      if (predictData.error) {
        throw new Error(predictData.error);
      }
      setPrediction(predictData);

      // Send sensitivity analysis request
      const sensitivityResponse = await fetch(`${API_URL}/api/analisis-sensibilidad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!sensitivityResponse.ok) {
        throw new Error('Error en el análisis de sensibilidad');
      }

      const sensitivityData: SensitivityResponse = await sensitivityResponse.json();
      if (sensitivityData.error) {
        throw new Error(sensitivityData.error);
      }
      setSensitivity(sensitivityData);
    } catch (err: unknown) {
      // Type guard to check if err is an Error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return { prediction, sensitivity, loading, error, submitPrediction };
};

export default usePrediction;
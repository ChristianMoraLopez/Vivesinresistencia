import React, { ReactElement, useState, useEffect } from 'react';
import { Card, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/Tabs';
import { Info, ChevronDown, ChevronUp, TrendingUp, AlertTriangle, CheckCircle, Eye, BarChart3 } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

// Define the SensitivityResponse interface
interface SensitivityResponse {
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
}

// Define the Matrix type for the matrices object
interface Matrix {
  data: number[][];
  xAxis: number[];
  yAxis: number[];
  xLabel: string;
  yLabel: string;
  stats: { min: number; max: number };
}

interface SensitivityAnalysisProps {
  sensitivity: SensitivityResponse | null;
}

const SensitivityAnalysis: React.FC<SensitivityAnalysisProps> = ({ sensitivity }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedMatrix, setSelectedMatrix] = useState<'glucosa_imc' | 'glucosa_cintura' | 'imc_cintura'>('glucosa_imc');
  const [viewMode, setViewMode] = useState<'heatmap' | 'table'>('heatmap');
  const [hoveredCell, setHoveredCell] = useState<{row: number, col: number, value: number} | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Smooth animation effect without pulsing
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedMatrix]);

  if (!sensitivity) return null;

  // Enhanced color function for better visual distinction
  const getHeatmapColor = (value: number): string => {
    const percent = value * 100;
    if (percent < 10) return 'from-green-50 to-green-100 border-green-200 text-green-800';
    if (percent < 25) return 'from-green-100 to-yellow-50 border-green-300 text-green-700';
    if (percent < 45) return 'from-yellow-50 to-yellow-100 border-yellow-300 text-yellow-800';
    if (percent < 65) return 'from-yellow-100 to-orange-100 border-orange-300 text-orange-800';
    if (percent < 80) return 'from-orange-100 to-red-100 border-orange-400 text-red-800';
    return 'from-red-100 to-red-200 border-red-400 text-red-900';
  };

  // Get risk level description
  const getRiskLevel = (value: number): { level: string; description: string; icon: ReactElement; color: string } => {
    const percent = value * 100;
    if (percent < 20) return { 
      level: 'Muy Bajo', 
      description: 'Como tener un resfrío leve', 
      icon: <CheckCircle className="w-4 h-4" />, 
      color: 'text-green-600' 
    };
    if (percent < 40) return { 
      level: 'Bajo', 
      description: 'Como el riesgo de lluvia en un día nublado', 
      icon: <CheckCircle className="w-4 h-4" />, 
      color: 'text-green-500' 
    };
    if (percent < 60) return { 
      level: 'Moderado', 
      description: 'Como el riesgo de tráfico en hora pico', 
      icon: <AlertTriangle className="w-4 h-4" />, 
      color: 'text-yellow-600' 
    };
    if (percent < 80) return { 
      level: 'Alto', 
      description: 'Como conducir con neblina densa', 
      icon: <AlertTriangle className="w-4 h-4" />, 
      color: 'text-orange-600' 
    };
    return { 
      level: 'Muy Alto', 
      description: 'Como caminar sobre hielo resbaladizo', 
      icon: <AlertTriangle className="w-4 h-4" />, 
      color: 'text-red-600' 
    };
  };

  // Calculate min/max for matrices
  const findMinMax = (matrix: number[][]): { min: number; max: number } => {
    let min = 1;
    let max = 0;

    matrix.forEach((row: number[]) => {
      row.forEach((value: number) => {
        if (value < min) min = value;
        if (value > max) max = value;
      });
    });

    return { min, max };
  };

  // Define matrices with explicit typing
  const matrices: Record<'glucosa_imc' | 'glucosa_cintura' | 'imc_cintura', Matrix> = {
    glucosa_imc: {
      data: sensitivity.resultados.matriz_glucosa_imc,
      xAxis: sensitivity.ejes.imc,
      yAxis: sensitivity.ejes.glucosa,
      xLabel: 'IMC (kg/m²)',
      yLabel: 'Glucosa (mg/dL)',
      stats: findMinMax(sensitivity.resultados.matriz_glucosa_imc),
    },
    glucosa_cintura: {
      data: sensitivity.resultados.matriz_glucosa_cintura,
      xAxis: sensitivity.ejes.cintura,
      yAxis: sensitivity.ejes.glucosa,
      xLabel: 'Circunferencia de Cintura (cm)',
      yLabel: 'Glucosa (mg/dL)',
      stats: findMinMax(sensitivity.resultados.matriz_glucosa_cintura),
    },
    imc_cintura: {
      data: sensitivity.resultados.matriz_imc_cintura,
      xAxis: sensitivity.ejes.cintura,
      yAxis: sensitivity.ejes.imc,
      xLabel: 'Circunferencia de Cintura (cm)',
      yLabel: 'IMC (kg/m²)',
      stats: findMinMax(sensitivity.resultados.matriz_imc_cintura),
    },
  };

  const currentMatrix = matrices[selectedMatrix];

  // Enhanced interpretation with everyday analogies
  const getDetailedInterpretation = (): ReactElement | null => {
    const { min, max } = currentMatrix.stats;
    const minPercent = (min * 100).toFixed(1);
    const maxPercent = (max * 100).toFixed(1);

    const commonIntro = (
      <div className="bg-blue-50 rounded-lg p-4 mb-4 border-l-4 border-blue-400">
        <div className="flex items-center mb-2">
          <Info className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="font-semibold text-blue-800">¿Cómo leer este mapa?</h4>
        </div>
        <p className="text-blue-700 text-sm">
          Imagina que este mapa es como un mapa meteorológico que muestra &quot;tormentas de riesgo &quot;. 
          Las zonas verdes son como días soleados (bajo riesgo), las amarillas como días nublados (riesgo moderado), 
          y las rojas como tormentas intensas (alto riesgo).
        </p>
      </div>
    );

    switch (selectedMatrix) {
      case 'glucosa_imc':
        return (
          <div className="space-y-4">
            {commonIntro}
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                Glucosa + Peso Corporal: Una Combinación Poderosa
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-indigo-600 min-w-4">•</span>
                  <p>
                    <strong>Rango de riesgo:</strong> Va desde {minPercent}% hasta {maxPercent}%. 
                    Es como la diferencia entre caminar en una acera seca versus caminar sobre hielo.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-indigo-600 min-w-4">•</span>
                  <p>
                    <strong>Efecto de la glucosa (vertical):</strong> Cuando subes en el mapa (más glucosa), 
                    es como subir el volumen de la música - el efecto se intensifica rápidamente.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-indigo-600 min-w-4">•</span>
                  <p>
                    <strong>Efecto del IMC (horizontal):</strong> Moverse hacia la derecha (más IMC) 
                    es como agregar leña al fuego - hace que todo sea más intenso.
                  </p>
                </div>
                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  <p className="text-yellow-800">
                    <strong>💡 Analogía:</strong> Es como cocinar - si tienes fuego alto (glucosa alta) Y mucho aceite (IMC alto), 
                    la probabilidad de que se queme la comida (desarrollar diabetes) aumenta dramáticamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'glucosa_cintura':
        return (
          <div className="space-y-4">
            {commonIntro}
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Glucosa + Grasa Abdominal: El Dúo Peligroso
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-green-600 min-w-4">•</span>
                  <p>
                    <strong>Rango de riesgo:</strong> {minPercent}% a {maxPercent}%. 
                    Como la diferencia entre manejar en una carretera despejada versus en una tormenta de nieve.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-green-600 min-w-4">•</span>
                  <p>
                    <strong>La cintura importa más de lo que crees:</strong> La grasa abdominal es como tener una fábrica 
                    de sustancias inflamatorias en tu cuerpo. Mientras más grande la &quot;fábrica &quot;, más problemas produce.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-green-600 min-w-4">•</span>
                  <p>
                    <strong>Esquina peligrosa:</strong> La esquina superior derecha del mapa (alta glucosa + cintura grande) 
                    es como tener una tormenta perfecta - todos los factores de riesgo se combinan.
                  </p>
                </div>
                <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                  <p className="text-orange-800">
                    <strong>🎯 Punto clave:</strong> Incluso si tu peso total es normal, una cintura grande puede ser tan 
                    peligrosa como tener sobrepeso general. Es como tener toda la presión concentrada en un punto débil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'imc_cintura':
        return (
          <div className="space-y-4">
            {commonIntro}
            <div className="bg-white rounded-lg p-4 border shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                IMC vs Cintura: Dos Formas de Medir el Mismo Problema
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-purple-600 min-w-4">•</span>
                  <p>
                    <strong>Rango de riesgo:</strong> {minPercent}% a {maxPercent}%. 
                    Como comparar el riesgo de diferentes tipos de clima extremo.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-purple-600 min-w-4">•</span>
                  <p>
                    <strong>IMC vs Cintura - ¿cuál es peor?</strong> El IMC es como medir qué tan cargado está tu carro, 
                    mientras que la cintura mide dónde está concentrado el peso. Ambos importan, pero de formas diferentes.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-purple-600 min-w-4">•</span>
                  <p>
                    <strong>El efecto combinado:</strong> Cuando ambos números son altos, el riesgo no solo se suma - se multiplica. 
                    Es como tener problemas eléctricos Y de plomería en casa al mismo tiempo.
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <p className="text-red-800">
                    <strong>⚠️ Dato importante:</strong> Puedes tener un IMC &quot;normal &quot; pero una cintura peligrosa, o viceversa. 
                    Es como tener diferentes tipos de advertencias en tu carro - todas requieren atención.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Heatmap visualization component
  const HeatmapView = () => (
    <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Mapa de Riesgo: {currentMatrix.yLabel} vs {currentMatrix.xLabel}
            </h3>
            <p className="text-sm text-gray-600">
              Cada celda muestra la probabilidad de desarrollar diabetes con esa combinación de factores
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-500">Nivel de riesgo:</div>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-gradient-to-r from-green-100 to-green-200 rounded border border-green-300"></div>
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded border border-yellow-300"></div>
              <div className="w-4 h-4 bg-gradient-to-r from-orange-100 to-orange-200 rounded border border-orange-300"></div>
              <div className="w-4 h-4 bg-gradient-to-r from-red-100 to-red-200 rounded border border-red-400"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-1 p-4 bg-gray-50 rounded-lg" style={{
          gridTemplateColumns: `auto repeat(${currentMatrix.xAxis.length}, 1fr)`,
          gridTemplateRows: `auto repeat(${currentMatrix.yAxis.length}, 1fr)`
        }}>
          {/* Corner cell */}
          <div className="flex items-center justify-center p-2 text-xs font-semibold text-gray-600">
            {currentMatrix.yLabel} \ {currentMatrix.xLabel}
          </div>
          
          {/* X-axis headers */}
          {currentMatrix.xAxis.map((val, index) => (
            <div key={`x-${index}`} className="flex items-center justify-center p-2 text-xs font-semibold text-gray-700 bg-blue-50 rounded border">
              {val.toFixed(1)}
            </div>
          ))}

          {/* Y-axis headers and data cells */}
          {currentMatrix.data.map((row: number[], rowIndex: number) => (
            <React.Fragment key={`row-${rowIndex}`}>
              {/* Y-axis header */}
              <div className="flex items-center justify-center p-2 text-xs font-semibold text-gray-700 bg-blue-50 rounded border">
                {currentMatrix.yAxis[rowIndex].toFixed(1)}
              </div>
              
              {/* Data cells */}
              {row.map((value: number, colIndex: number) => {
                const riskInfo = getRiskLevel(value);
                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`
                      relative p-3 text-center text-xs font-bold rounded border-2 cursor-pointer
                      bg-gradient-to-br ${getHeatmapColor(value)}
                      transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:z-10
                      ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
                    `}
                    onMouseEnter={() => setHoveredCell({row: rowIndex, col: colIndex, value})}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      transitionDelay: `${(rowIndex + colIndex) * 30}ms`
                    }}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      {riskInfo.icon}
                      <span>{(value * 100).toFixed(1)}%</span>
                    </div>
                    
                    {/* Hover tooltip */}
                    {hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex && (
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-3 py-2 shadow-lg z-20 whitespace-nowrap">
                        <div className="font-semibold">{riskInfo.level}</div>
                        <div>{riskInfo.description}</div>
                        <div className="text-gray-300">{currentMatrix.yLabel}: {currentMatrix.yAxis[rowIndex].toFixed(1)}</div>
                        <div className="text-gray-300">{currentMatrix.xLabel}: {currentMatrix.xAxis[colIndex].toFixed(1)}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Risk level legend */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Guía de Niveles de Riesgo</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2 p-2 bg-green-50 rounded border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div>
                <div className="font-medium text-green-800">Bajo (0-40%)</div>
                <div className="text-xs text-green-600">Como un día soleado</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded border border-yellow-200">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <div>
                <div className="font-medium text-yellow-800">Moderado (40-60%)</div>
                <div className="text-xs text-yellow-600">Como tráfico en hora pico</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-red-50 rounded border border-red-200">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <div>
                <div className="font-medium text-red-800">Alto (60%+)</div>
                <div className="text-xs text-red-600">Como caminar sobre hielo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced table view
  const TableView = () => (
    <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">
            Tabla Detallada: {currentMatrix.yLabel} vs {currentMatrix.xLabel}
          </h3>
          <div className="text-xs text-gray-500">Valores en porcentaje de riesgo</div>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                {currentMatrix.yLabel} \ {currentMatrix.xLabel}
              </th>
              {currentMatrix.xAxis.map((val, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50"
                >
                  {val.toFixed(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentMatrix.data.map((row: number[], rowIndex: number) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 bg-blue-50 border-r">
                  {currentMatrix.yAxis[rowIndex].toFixed(1)}
                </td>
                {row.map((value: number, colIndex: number) => {
                  const riskInfo = getRiskLevel(value);
                  return (
                    <td
                      key={colIndex}
                      className={`px-4 py-3 text-center text-sm font-bold bg-gradient-to-br ${getHeatmapColor(value)} transition-all duration-300 hover:scale-105`}
                      title={`${riskInfo.level}: ${riskInfo.description}`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <span>{(value * 100).toFixed(1)}%</span>
                        <span className={`text-xs ${riskInfo.color}`}>{riskInfo.level}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="mt-10 transition-all duration-500 ease-in-out">
      <SectionTitle
        centered
        subtitle="Descubre cómo diferentes factores combinados afectan tu riesgo de diabetes"
      >
        Análisis de Sensibilidad Multivariado
      </SectionTitle>

      {/* Enhanced explanation section */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
        <div className="flex items-start">
          <div className="mr-4 mt-1">
            <Info size={24} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-800 mb-2">¿Qué es un análisis de sensibilidad?</h3>
            <p className="text-blue-700 mb-3 leading-relaxed">
              Imagina que tu cuerpo es como un automóvil y los factores de riesgo (glucosa, peso, cintura) son como 
              diferentes partes del motor. Este análisis nos muestra qué pasa cuando varias partes empiezan a fallar 
              al mismo tiempo - ¿el carro sigue funcionando o se detiene por completo?
            </p>

            <button
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
              onClick={() => setShowExplanation(!showExplanation)}
            >
              {showExplanation ? (
                <>
                  Mostrar menos <ChevronUp size={18} className="ml-1" />
                </>
              ) : (
                <>
                  Entender más detalles <ChevronDown size={18} className="ml-1" />
                </>
              )}
            </button>

            {showExplanation && (
              <div className="mt-4 space-y-4 animate-in slide-in-from-top duration-300">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">🧮 Conceptos Matemáticos Simples</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li><strong>Derivadas parciales:</strong> Como revisar qué tan sensible es tu carro a cada tipo de combustible</li>
                      <li><strong>Gradiente:</strong> La dirección donde el riesgo aumenta más rápidamente</li>
                      <li><strong>Matrices:</strong> Tablas que muestran todas las combinaciones posibles</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 ¿Por qué es importante?</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li><strong>Prevención personalizada:</strong> Saber qué cambiar primero en tu estilo de vida</li>
                      <li><strong>Priorización:</strong> Enfocarte en lo que más impacto tiene</li>
                      <li><strong>Monitoreo:</strong> Saber qué números vigilar más de cerca</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced tabs and view selector */}
      <div className="mb-6">
        <Tabs
          value={selectedMatrix}
          onValueChange={(value: string) => {
            setSelectedMatrix(value as 'glucosa_imc' | 'glucosa_cintura' | 'imc_cintura');
          }}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="glucosa_imc" className="text-sm font-medium">
                🍯 Glucosa + Peso
              </TabsTrigger>
              <TabsTrigger value="glucosa_cintura" className="text-sm font-medium">
                🍯 Glucosa + Cintura
              </TabsTrigger>
              <TabsTrigger value="imc_cintura" className="text-sm font-medium">
                ⚖️ Peso + Cintura
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2 bg-white rounded-lg p-1 border shadow-sm">
              <button
                onClick={() => setViewMode('heatmap')}
                className={`flex items-center space-x-2 px-3 py-2 rounded transition-all duration-200 ${
                  viewMode === 'heatmap' 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Eye size={16} />
                <span className="text-sm font-medium">Mapa Visual</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center space-x-2 px-3 py-2 rounded transition-all duration-200 ${
                  viewMode === 'table' 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <BarChart3 size={16} />
                <span className="text-sm font-medium">Tabla Detallada</span>
              </button>
            </div>
          </div>

          {/* Main visualization */}
          <div className="mb-6">
            {viewMode === 'heatmap' ? <HeatmapView /> : <TableView />}
          </div>

          {/* Detailed interpretation */}
          <div className="mb-6">
            {getDetailedInterpretation()}
          </div>
        </Tabs>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardTitle className="p-6 text-lg font-bold text-purple-800 border-b border-purple-200 flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              🧮
            </div>
            Interpretación Matemática
          </CardTitle>
          <CardContent className="p-6">
            <div className="space-y-3 text-sm text-purple-700">
              <p className="leading-relaxed">
                <strong>¿Cómo funciona?</strong> Este análisis usa derivadas parciales para examinar cómo pequeños cambios 
                en cada variable afectan la probabilidad final.
              </p>
              <div className="bg-purple-100 p-3 rounded-lg border-l-4 border-purple-400">
                <p className="text-purple-800 font-medium">
                  💡 Piénsalo así: Es como ajustar diferentes perillas en un equipo de sonido y ver cómo cada una 
                  afecta el volumen final.
                </p>
              </div>
              <p>
                La pendiente entre celdas representa la <strong>tasa de cambio</strong> - qué tan rápido aumenta 
                el riesgo cuando cambias esos factores.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardTitle className="p-6 text-lg font-bold text-green-800 border-b border-green-200 flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              🏥
            </div>
            Significado Clínico
          </CardTitle>
          <CardContent className="p-6">
            <div className="space-y-3 text-sm text-green-700">
              <p className="leading-relaxed">
                <strong>¿Qué significan los colores?</strong> Las zonas más oscuras son como &quot;zonas de peligro &quot;
                donde múltiples factores se combinan para crear alto riesgo.
              </p>
              <div className="bg-green-100 p-3 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 font-medium">
                  🎯 Clave para doctores: Este análisis identifica los &quot;puntos críticos &quot; donde pequeños cambios 
                  producen grandes mejoras en la salud.
                </p>
              </div>
              <p>
                Permite crear estrategias de prevención más efectivas, como saber si es mejor enfocarse primero 
                en bajar la glucosa o el peso.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardTitle className="p-6 text-lg font-bold text-orange-800 border-b border-orange-200 flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              🎯
            </div>
            Aplicación Práctica
          </CardTitle>
          <CardContent className="p-6">
            <div className="space-y-3 text-sm text-orange-700">
              <p className="leading-relaxed">
                <strong>¿Cómo usar esta información?</strong> Como una brújula para tus decisiones de salud - 
                te muestra hacia dónde dirigir tus esfuerzos.
              </p>
              <div className="bg-orange-100 p-3 rounded-lg border-l-4 border-orange-400">
                <p className="text-orange-800 font-medium">
                  💪 Ejemplo práctico: Si estás en una zona amarilla (riesgo moderado), pequeños cambios pueden 
                  llevarte a la zona verde (bajo riesgo).
                </p>
              </div>
              <p>
                Ideal para crear planes personalizados: algunas personas se benefician más controlando el peso, 
                otras la glucosa, y otras la grasa abdominal.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive insights section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            💡
          </div>
          Consejos Basados en el Análisis
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              Si estás en zona verde (bajo riesgo)
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Mantén tus hábitos actuales - están funcionando bien</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Haz chequeos preventivos regulares para mantenerte en esta zona</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Considera pequeños ajustes para optimizar aún más tu salud</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
              Si estás en zona amarilla/roja (riesgo alto)
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Identifica cuál factor (glucosa, peso, cintura) es más fácil de cambiar para ti</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Busca apoyo profesional - pequeños cambios pueden tener gran impacto</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Monitorea regularmente para ver tu progreso hacia zonas más seguras</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500">
          <p className="text-blue-800 text-sm">
            <strong>🔍 Recuerda:</strong> Este análisis es una herramienta de orientación. Siempre consulta con un 
            profesional de la salud para interpretar estos resultados en el contexto de tu situación personal específica.
          </p>
        </div>
      </div>

      {/* Footer with methodology */}
      <div className="mt-8 bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
            📊
          </div>
          Metodología del Análisis
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">1. Recolección de Datos</h4>
            <p>Se utilizan rangos realistas de valores para cada variable basados en poblaciones reales.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">2. Cálculo de Sensibilidad</h4>
            <p>Se aplican modelos matemáticos que evalúan el impacto de cada combinación de factores.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">3. Visualización Interpretable</h4>
            <p>Los resultados se presentan con colores y analogías que facilitan la comprensión.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensitivityAnalysis;
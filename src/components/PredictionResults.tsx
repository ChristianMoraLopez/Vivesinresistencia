import React, { useState, useEffect } from 'react';
import { 
  ActivitySquare, 
  AlertTriangle, 
  Award, 
  Check, 
  ChevronRight, 
  FileWarning, 
  Heart, 
  HelpCircle, 
  Info, 
  Lightbulb, 
  Bolt
} from 'lucide-react';
import { PredictionResponse } from '../hooks/usePrediction';

interface PredictionResultsProps {
  prediction: PredictionResponse;
}

const PredictionResults = ({ prediction }: PredictionResultsProps) => {
  const [animate, setAnimate] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (prediction) {
      setAnimate(true);
      // Reset animation state after the animation has completed
      const timer = setTimeout(() => {
        setShowDescription(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [prediction]);

  if (!prediction) return null;

  // Determine risk level color and icon
  const getRiskLevelInfo = () => {
    const nivel = prediction.nivel_riesgo.toLowerCase();
    
    if (nivel.includes('alto')) {
      return { 
        color: 'text-red-600', 
        bgColor: 'bg-red-100', 
        borderColor: 'border-red-300',
        icon: <AlertTriangle className="text-red-600" size={22} />
      };
    } else if (nivel.includes('moderado')) {
      return { 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-100', 
        borderColor: 'border-orange-300',
        icon: <FileWarning className="text-orange-600" size={22} />
      };
    } else {
      return { 
        color: 'text-green-600', 
        bgColor: 'bg-green-100', 
        borderColor: 'border-green-300',
        icon: <Check className="text-green-600" size={22} />
      };
    }
  };

  // Get information for HOMA-IR gauge
  const getHomaGaugeInfo = () => {
    const homaValue = prediction.homa_ir;
    let position, color;
    
    if (homaValue < 1.5) {
      position = (homaValue / 1.5) * 25; // 0-25% of gauge
      color = 'bg-green-500';
    } else if (homaValue < 2.5) {
      position = 25 + ((homaValue - 1.5) / 1) * 25; // 25-50% of gauge
      color = 'bg-yellow-500';
    } else if (homaValue < 3.8) {
      position = 50 + ((homaValue - 2.5) / 1.3) * 25; // 50-75% of gauge
      color = 'bg-orange-500';
    } else {
      position = 75 + Math.min(((homaValue - 3.8) / 2.2) * 25, 25); // 75-100% of gauge
      color = 'bg-red-600';
    }
    
    return { position, color };
  };

  const homaInfo = getHomaGaugeInfo();
  const riskInfo = getRiskLevelInfo();
  
  // Helper function to determine if resistance is detected
  const isResistanceDetected = prediction.prediccion;
  const probabilityPercentage = (prediction.probabilidad * 100).toFixed(1);

  return (
    <div className={`mt-16 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Header with animated reveal */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-lg mb-3">
          <ActivitySquare className="text-purple-600" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Resultados de la Evaluación</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Análisis de tu riesgo metabólico basado en los datos proporcionados
        </p>
      </div>

      {/* Main Result - Hero Section */}
      <div className={`bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 shadow-lg mb-8 transition-all duration-1000 delay-300 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h3 className="text-lg font-medium text-purple-800 mb-1">Diagnóstico Principal</h3>
            <div className="flex items-center mb-4">
              <div className={`text-2xl md:text-3xl font-bold ${isResistanceDetected ? 'text-red-600' : 'text-green-600'}`}>
                {isResistanceDetected ? 'Resistencia a la Insulina Detectada' : 'Sin Resistencia a la Insulina'}
              </div>
              {isResistanceDetected ? 
                <AlertTriangle className="ml-2 text-red-600" size={28} /> : 
                <Check className="ml-2 text-green-600" size={28} />
              }
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full ${riskInfo.bgColor} ${riskInfo.color} text-sm font-medium`}>
              {riskInfo.icon}
              <span className="ml-1">Nivel de Riesgo: {prediction.nivel_riesgo}</span>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-full md:w-48">
            <div className="relative">
              <svg className="w-full" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={isResistanceDetected ? '#dc2626' : '#10b981'}
                  strokeWidth="12"
                  strokeDasharray="339.292"
                  strokeDashoffset={339.292 * (1 - prediction.probabilidad)}
                  transform="rotate(-90 60 60)"
                  className="transition-all duration-1000 ease-out"
                />
                <text
                  x="60"
                  y="65"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#1e293b"
                >
                  {probabilityPercentage}%
                </text>
              </svg>
              <div className="text-center mt-2 text-sm font-medium text-gray-500">
                Probabilidad de resistencia
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-6 font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === 'overview' 
              ? 'text-purple-700 border-b-2 border-purple-700' 
              : 'text-gray-500 hover:text-purple-700'
          }`}
        >
          Vista General
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`py-3 px-6 font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === 'details' 
              ? 'text-purple-700 border-b-2 border-purple-700' 
              : 'text-gray-500 hover:text-purple-700'
          }`}
        >
          Detalles Técnicos
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`py-3 px-6 font-medium text-sm whitespace-nowrap transition-all ${
            activeTab === 'recommendations' 
              ? 'text-purple-700 border-b-2 border-purple-700' 
              : 'text-gray-500 hover:text-purple-700'
          }`}
        >
          Recomendaciones
        </button>
      </div>

      {/* Tab Content */}
      <div className={`transition-all duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        {/* Overview Tab */}
        <div className={activeTab === 'overview' ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* HOMA-IR Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:translate-y-1">
              <div className="bg-blue-50 p-4 flex justify-between items-center">
                <h3 className="font-semibold text-blue-800 flex items-center">
                  <ActivitySquare className="mr-2" size={18} />
                  HOMA-IR
                </h3>
                <button 
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <HelpCircle size={18} />
                </button>
              </div>
              
              {showDescription && (
                <div className="px-4 py-2 bg-blue-50 text-xs text-blue-800 border-t border-blue-100 animate-fadeIn">
                  HOMA-IR es un indicador de resistencia a la insulina. Valores superiores a 2.5 indican resistencia.
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm">Valor:</span>
                  <span className="font-bold text-lg">{prediction.homa_ir.toFixed(2)}</span>
                </div>
                
                <div className="relative h-3 bg-gray-200 rounded-full mt-4 mb-1">
                  <div 
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${homaInfo.color}`}
                    style={{ width: `${homaInfo.position}%` }}
                  ></div>
                  
                  {/* Markers */}
                  <div className="absolute -bottom-6 left-0 text-xs text-gray-500">0</div>
                  <div className="absolute -bottom-6 left-1/4 text-xs text-gray-500">1.5</div>
                  <div className="absolute -bottom-6 left-1/2 text-xs text-gray-500">2.5</div>
                  <div className="absolute -bottom-6 left-3/4 text-xs text-gray-500">3.8</div>
                  <div className="absolute -bottom-6 right-0 text-xs text-gray-500">6+</div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 mt-6">
                  <span>Normal</span>
                  <span>Moderado</span>
                  <span>Alto</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskInfo.bgColor} ${riskInfo.color}`}>
                      {prediction.categoria}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resistencia Card */}
           <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-purple-50 p-4">
                        <h3 className="font-semibold text-purple-800 flex items-center">
                        <Bolt className="mr-2" size={18} />
                        Probabilidad de Resistencia
                        </h3>
                    </div>
                    
                    <div className="p-4">
                        <div className="flex flex-col items-center">
                        {/* Eliminado completamente el SVG complicado */}
                        <div className="text-5xl font-bold my-6 text-gray-800">
                            {probabilityPercentage}%
                        </div>
                        
                        <div className={`flex items-center p-3 rounded-lg w-full justify-center ${
                            isResistanceDetected ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
                        }`}>
                            {isResistanceDetected ? (
                            <>
                                <AlertTriangle className="mr-2" size={18} />
                                <span>Resistencia Detectada</span>
                            </>
                            ) : (
                            <>
                                <Check className="mr-2" size={18} />
                                <span>Sin Resistencia Detectada</span>
                            </>
                            )}
                        </div>
                        </div>
                    </div>
                    </div>
            
            {/* Risk Level Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:translate-y-1">
              <div className="bg-amber-50 p-4">
                <h3 className="font-semibold text-amber-800 flex items-center">
                  <Award className="mr-2" size={18} />
                  Nivel de Riesgo
                </h3>
              </div>
              <div className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${riskInfo.bgColor} transition-all duration-500`}>
                    <div className={`text-3xl font-bold ${riskInfo.color}`}>
                      {prediction.nivel_riesgo.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {prediction.nivel_riesgo}
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-2">
                    {prediction.categoria === 'Normal' ? 
                      'Valores dentro de los límites normales.' : 
                      prediction.categoria === 'Prediabetes' ?
                      'Atención requerida. Riesgo moderado de desarrollar resistencia a la insulina.' :
                      'Atención médica necesaria. Se recomienda seguir las recomendaciones indicadas.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Details Tab */}
        <div className={activeTab === 'details' ? 'block' : 'hidden'}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Info className="mr-2 text-blue-600" size={20} />
              Detalles Técnicos
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Parámetros Evaluados</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight size={16} className="text-purple-600 mr-2" />
                    <span className="text-gray-600">HOMA-IR: <span className="font-medium">{prediction.homa_ir.toFixed(2)}</span></span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="text-purple-600 mr-2" />
                    <span className="text-gray-600">Categoría: <span className="font-medium">{prediction.categoria}</span></span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="text-purple-600 mr-2" />
                    <span className="text-gray-600">Nivel de Riesgo: <span className="font-medium">{prediction.nivel_riesgo}</span></span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Resultado del Modelo Predictivo</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight size={16} className="text-purple-600 mr-2" />
                    <span className="text-gray-600">Probabilidad: <span className="font-medium">{probabilityPercentage}%</span></span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="text-purple-600 mr-2" />
                    <span className="text-gray-600">Predicción: <span className="font-medium">{prediction.prediccion ? 'Positiva' : 'Negativa'}</span></span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="text-purple-600 mr-2" />
                    <span className="text-gray-600">Confianza: <span className="font-medium">{prediction.probabilidad > 0.8 || prediction.probabilidad < 0.2 ? 'Alta' : 'Moderada'}</span></span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Interpretación de Resultados</h4>
              <p className="text-gray-600">
                {prediction.categoria === 'Normal' ? 
                  'Tus resultados indican que los parámetros metabólicos están dentro de los rangos normales. El modelo predictivo sugiere un bajo riesgo de resistencia a la insulina.' : 
                  prediction.categoria === 'Prediabetes' ?
                  'Tus resultados muestran algunos valores fuera del rango óptimo, lo que puede indicar un estado prediabético o riesgo de desarrollar resistencia a la insulina en el futuro.' :
                  'Tus resultados indican valores consistentes con resistencia a la insulina. El modelo predictivo señala una alta probabilidad de esta condición.'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Recommendations Tab */}
        <div className={activeTab === 'recommendations' ? 'block' : 'hidden'}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-green-50 p-6">
              <h3 className="text-lg font-semibold text-green-800 flex items-center mb-1">
                <Lightbulb className="mr-2" size={20} />
                Recomendaciones Personalizadas
              </h3>
              <p className="text-green-600 text-sm">
                Basadas en tu perfil metabólico y resultados del análisis
              </p>
            </div>
            
            {prediction.recomendaciones.length > 0 ? (
              <div className="p-6">
                <ul className="space-y-4">
                  {prediction.recomendaciones.map((rec, index) => (
                    <li key={index} className={`flex items-start p-3 rounded-lg transition-all duration-300 ${
                      index % 3 === 0 ? 'bg-blue-50' : 
                      index % 3 === 1 ? 'bg-green-50' : 
                      'bg-purple-50'
                    }`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        index % 3 === 0 ? 'bg-blue-100 text-blue-600' : 
                        index % 3 === 1 ? 'bg-green-100 text-green-600' : 
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {index % 3 === 0 ? <Heart size={16} /> : 
                         index % 3 === 1 ? <Award size={16} /> : 
                         <Lightbulb size={16} />}
                      </div>
                      <div>
                        <p className="text-gray-700">{rec}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="bg-amber-50 p-4 rounded-lg flex items-start">
                    <Info className="flex-shrink-0 text-amber-600 mr-3 mt-0.5" size={18} />
                    <p className="text-amber-800 text-sm">
                      Estas recomendaciones son generales. Consulta con un profesional de la salud para obtener orientación personalizada y un plan de tratamiento adecuado.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
                  <Check className="text-green-600" size={24} />
                </div>
                <p className="text-gray-600">No se requieren recomendaciones específicas.</p>
                <p className="text-gray-500 text-sm mt-2">
                  Tus resultados indican valores normales. Mantén un estilo de vida saludable.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer with Additional Info */}
      <div className={`mt-8 text-center text-sm text-gray-500 transition-all duration-1000 delay-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        <p>
          Esta evaluación se basa en los datos proporcionados y modelos predictivos. No reemplaza el diagnóstico médico profesional.
        </p>
      </div>
    </div>
  );
};

export default PredictionResults;
import React, { useState, useEffect, ReactElement } from 'react';
import { Activity, User, Ruler, Weight, LineChart, Thermometer, ArrowRightCircle } from 'lucide-react';
import { PredictionInput } from '../hooks/usePrediction';

interface FormData {
  genero: string;
  edad: string;
  glucosa: string;
  insulina: string;
  peso: string;
  altura: string;
  cintura: string;
}

interface PredictionFormProps {
  onSubmit: (data: PredictionInput) => void;
  loading: boolean;
}

// Define types for form field configurations
interface SelectField {
  name: string;
  label: string;
  icon: ReactElement;
  type: 'select';
  options: { value: string; text: string }[];
}

interface NumberField {
  name: string;
  label: string;
  icon: ReactElement;
  type: 'number';
  min: string;
  max: string;
  step?: string;
}

type FormField = SelectField | NumberField;

const PredictionForm = ({ onSubmit, loading }: PredictionFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    genero: '',
    edad: '',
    glucosa: '',
    insulina: '',
    peso: '',
    altura: '',
    cintura: '',
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [imc, setImc] = useState<number | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [animateField, setAnimateField] = useState('');

  useEffect(() => {
    // Calculate completion percentage
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field !== '').length;
    setCompletionPercentage((filledFields / fields.length) * 100);
    
    // Calculate IMC when both height and weight are provided
    if (formData.peso && formData.altura) {
      const calculatedImc = parseFloat(formData.peso) / (parseFloat(formData.altura) * parseFloat(formData.altura));
      if (isFinite(calculatedImc) && calculatedImc > 0) {
        setImc(parseFloat(calculatedImc.toFixed(2)));
      } else {
        setImc(null);
      }
    } else {
      setImc(null);
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setAnimateField(name);
    
    // Clear animation after 1 second
    setTimeout(() => {
      setAnimateField('');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imc) {
      alert('Peso y altura deben ser válidos para calcular el IMC');
      return;
    }

    const data: PredictionInput = {
      genero: parseInt(formData.genero),
      edad: parseFloat(formData.edad),
      glucosa: parseFloat(formData.glucosa),
      insulina: parseFloat(formData.insulina),
      imc,
      cintura: parseFloat(formData.cintura),
    };

    onSubmit(data);
  };

  const formSteps: FormField[][] = [
    [
      {
        name: 'genero',
        label: 'Género',
        icon: <User size={20} />,
        type: 'select',
        options: [
          { value: '', text: 'Selecciona' },
          { value: '1', text: 'Masculino' },
          { value: '2', text: 'Femenino' },
        ],
      },
      {
        name: 'edad',
        label: 'Edad (años)',
        icon: <Activity size={20} />,
        type: 'number',
        min: '18',
        max: '120',
      },
    ],
    [
      {
        name: 'glucosa',
        label: 'Glucosa (mg/dL)',
        icon: <Thermometer size={20} />,
        type: 'number',
        min: '50',
        max: '300',
        step: '0.1',
      },
      {
        name: 'insulina',
        label: 'Insulina (µU/mL)',
        icon: <LineChart size={20} />,
        type: 'number',
        min: '2',
        max: '100',
        step: '0.1',
      },
    ],
    [
      {
        name: 'peso',
        label: 'Peso (kg)',
        icon: <Weight size={20} />,
        type: 'number',
        min: '30',
        max: '200',
        step: '0.1',
      },
      {
        name: 'altura',
        label: 'Altura (m)',
        icon: <Ruler size={20} />,
        type: 'number',
        min: '1',
        max: '2.5',
        step: '0.01',
      },
      {
        name: 'cintura',
        label: 'Cintura (cm)',
        icon: <Ruler size={20} />,
        type: 'number',
        min: '50',
        max: '150',
        step: '0.1',
      },
    ],
  ];

  // Get IMC category and color
  const getImcCategory = () => {
    if (!imc) return { text: '', color: '' };
    
    if (imc < 18.5) return { text: 'Bajo peso', color: 'text-blue-500' };
    if (imc < 25) return { text: 'Peso normal', color: 'text-green-500' };
    if (imc < 30) return { text: 'Sobrepeso', color: 'text-yellow-500' };
    if (imc < 35) return { text: 'Obesidad grado I', color: 'text-orange-500' };
    if (imc < 40) return { text: 'Obesidad grado II', color: 'text-red-500' };
    return { text: 'Obesidad grado III', color: 'text-red-700' };
  };

  const imcCategory = getImcCategory();
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      
      {/* Steps Indicator */}
      <div className="flex justify-center mt-4 mb-6">
        {formSteps.map((_, index) => (
          <div 
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-2 cursor-pointer transition-all duration-300 ${
              index === currentStep 
                ? 'bg-purple-600 text-white shadow-lg scale-110' 
                : index < currentStep 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-8">
          Evaluación de Riesgo Metabólico
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className={`transition-all duration-500 ${currentStep === 0 ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formSteps[0].map((field) => (
                <div key={field.name} className={`transition-all duration-300 ${animateField === field.name ? 'scale-105' : ''}`}>
                  <label htmlFor={field.name} className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <span className="mr-2 text-purple-600">{field.icon}</span>
                    {field.label}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      required
                    >
                      {(field as SelectField).options.map((option: { value: string; text: string }) => (
                        <option key={option.value} value={option.value}>{option.text}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      min={(field as NumberField).min}
                      max={(field as NumberField).max}
                      step={(field as NumberField).step}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      required
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
              >
                Siguiente
                <ArrowRightCircle className="ml-2" size={20} />
              </button>
            </div>
          </div>
          
          <div className={`transition-all duration-500 ${currentStep === 1 ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formSteps[1].map((field) => (
                <div key={field.name} className={`transition-all duration-300 ${animateField === field.name ? 'scale-105' : ''}`}>
                  <label htmlFor={field.name} className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <span className="mr-2 text-purple-600">{field.icon}</span>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    min={(field as NumberField).min}
                    max={(field as NumberField).max}
                    step={(field as NumberField).step}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    required
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                className="flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
              >
                Siguiente
                <ArrowRightCircle className="ml-2" size={20} />
              </button>
            </div>
          </div>
          
          <div className={`transition-all duration-500 ${currentStep === 2 ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formSteps[2].map((field) => (
                <div key={field.name} className={`transition-all duration-300 ${animateField === field.name ? 'scale-105' : ''}`}>
                  <label htmlFor={field.name} className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <span className="mr-2 text-purple-600">{field.icon}</span>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    min={(field as NumberField).min}
                    max={(field as NumberField).max}
                    step={(field as NumberField).step}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    required
                  />
                </div>
              ))}
            </div>
            
            {/* IMC Display */}
            {imc && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="font-medium text-gray-700">Índice de Masa Corporal (IMC)</div>
                  <div className="text-3xl font-bold mt-1">{imc}</div>
                  <div className={`mt-1 font-medium ${imcCategory.color}`}>
                    {imcCategory.text}
                  </div>
                  
                  {/* IMC Visual Scale */}
                  <div className="mt-3 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-700 h-2 rounded-full w-full">
                    <div 
                      className="w-4 h-4 bg-white border-2 border-gray-800 rounded-full relative -top-1 transition-all duration-500"
                      style={{ 
                        marginLeft: `${Math.min(Math.max((imc / 45) * 100, 0), 100)}%`,
                        transform: 'translateX(-50%)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Anterior
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  'Evaluar Riesgo'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictionForm;
# 🩺 Vive Sin Resistencia - Predictor de Resistencia a la Insulina

Una aplicación web completa que utiliza machine learning para evaluar el riesgo de resistencia a la insulina, desarrollada con React/Next.js en el frontend y Python para el análisis de datos y modelo predictivo.

## 📋 Descripción del Proyecto

**Vive Sin Resistencia** es una herramienta de evaluación de riesgo que combina ciencia de datos con una interfaz de usuario intuitiva para ayudar a las personas a entender y gestionar su riesgo de resistencia a la insulina, una condición clave relacionada con diabetes tipo 2, obesidad y síndrome de ovario poliquístico (SOP).

## 🎯 Características Principales

### Frontend (React/Next.js)
- **Interfaz moderna y responsiva** con animaciones fluidas
- **Evaluación interactiva** mediante formularios optimizados
- **Visualizaciones dinámicas** de resultados y recomendaciones
- **Diseño centrado en UX/UI** con componentes reutilizables
- **Sistema de navegación** intuitivo con múltiples páginas
- **Responsive design** optimizado para dispositivos móviles

### Backend (Python/ML)
- **Modelo de Machine Learning** (Random Forest Classifier)
- **Procesamiento de datos NHANES** (National Health and Nutrition Examination Survey)
- **Cálculo automático de HOMA-IR** (Homeostatic Model Assessment for Insulin Resistance)
- **Análisis de sensibilidad matemático** con derivadas parciales
- **Generación de recomendaciones personalizadas**

## 🔬 Metodología Científica

### Fuente de Datos
- **Dataset**: NHANES (Encuesta Nacional de Salud y Nutrición de EE.UU.)
- **Archivos procesados**: 
  - `GLU_L.xpt` - Niveles de glucosa
  - `INS_L.xpt` - Niveles de insulina  
  - `DEMO_L.xpt` - Datos demográficos
  - `BMX_L.xpt` - Medidas corporales

### Variables Analizadas
- **Demográficas**: Género, Edad
- **Bioquímicas**: Glucosa en sangre, Insulina
- **Antropométricas**: IMC, Circunferencia de cintura

### Modelo Predictivo
```python
# Cálculo del índice HOMA-IR
HOMA_IR = (Glucosa * Insulina) / 405

# Clasificación binaria
resistencia_insulina = 1 if HOMA_IR >= 2.5 else 0
```

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 13+ con App Router
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Iconos**: Lucide React
- **Animaciones**: CSS Transitions + Transform

### Backend/Data Science
- **Lenguaje**: Python 3.8+
- **ML Framework**: Scikit-learn
- **Data Processing**: Pandas, NumPy
- **Análisis Matemático**: SymPy
- **Formato de datos**: SAS (.xpt files)

### Arquitectura
```
├── Frontend (Next.js)
│   ├── Páginas interactivas
│   ├── Componentes reutilizables
│   ├── Sistema de routing
│   └── Responsive design
│
├── Backend (Python)
│   ├── Procesamiento de datos NHANES
│   ├── Entrenamiento del modelo ML
│   ├── Cálculos matemáticos avanzados
│   └── API de predicciones
│
└── Integración
    ├── Flujo de datos bidireccional
    ├── Validación de entrada
    └── Manejo de errores
```

## 📊 Funcionalidades Técnicas

### Análisis de Datos
- **ETL Pipeline**: Extracción, transformación y carga de datos NHANES
- **Feature Engineering**: Creación de variables derivadas (HOMA-IR)
- **Data Cleaning**: Manejo de valores faltantes y outliers
- **Exploratory Data Analysis**: Análisis estadístico descriptivo

### Machine Learning
- **Algoritmo**: Random Forest Classifier
- **Métricas de evaluación**: Accuracy, Precision, Recall, F1-Score
- **Validation**: Cross-validation y train/test split
- **Feature Importance**: Análisis de importancia de variables

### Análisis Matemático Avanzado
```python
# Cálculo de derivadas parciales para análisis de sensibilidad
def calcular_derivadas_parciales(self, glucosa, imc, cintura):
    # Función de riesgo con términos de interacción
    R = α*x + β*y + γ*z + δ*x*y + ε*x*z + ζ*y*z
    
    # Derivadas parciales
    ∂R/∂x = α + δ*y + ε*z  # Sensibilidad a glucosa
    ∂R/∂y = β + δ*x + ζ*z  # Sensibilidad a IMC  
    ∂R/∂z = γ + ε*x + ζ*y  # Sensibilidad a cintura
```

## 🚀 Instalación y Configuración

### Prerrequisitos
```bash
Node.js >= 18.0.0
Python >= 3.8
npm o yarn
pip
```

### Frontend
```bash
# Clonar repositorio
git clone <repository-url>
cd vive-sin-resistencia

# Instalar dependencias
npm install
# o
yarn install

# Ejecutar en desarrollo
npm run dev
# o
yarn dev
```

### Backend
```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Instalar dependencias
pip install pandas numpy scikit-learn sympy

# Ejecutar procesamiento de datos
python data_processing.py

# Entrenar modelo
python train_model.py
```

## 📁 Estructura del Proyecto

```
vive-sin-resistencia/
├── frontend/
│   ├── app/
│   │   ├── page.js                 # Página principal
│   │   ├── about/
│   │   │   └── page.js            # Página "Acerca de"
│   │   └── layout.js              # Layout principal
│   ├── components/
│   │   ├── ui/                    # Componentes base (shadcn/ui)
│   │   └── custom/                # Componentes personalizados
│   ├── lib/
│   │   └── utils.js               # Utilidades
│   └── styles/
│       └── globals.css            # Estilos globales
│
├── backend/
│   ├── data_processing.py         # Procesamiento de datos NHANES
│   ├── model_training.py          # Entrenamiento del modelo ML
│   ├── model_helper.py           # Clase helper para cálculos
│   ├── prediction_api.py         # API de predicciones
│   └── data/
│       ├── GLU_L.xpt             # Datos de glucosa
│       ├── INS_L.xpt             # Datos de insulina
│       ├── DEMO_L.xpt            # Datos demográficos
│       └── BMX_L.xpt             # Medidas corporales
│
└── docs/
    ├── methodology.md            # Metodología científica
    ├── api_documentation.md      # Documentación de API
    └── deployment.md            # Guía de despliegue
```

## 🔍 Características Destacadas

### 1. Análisis Científico Riguroso
- Basado en datos oficiales de salud pública (NHANES)
- Implementación del índice HOMA-IR validado científicamente
- Análisis matemático con derivadas parciales para sensibilidad

### 2. Machine Learning Avanzado
- Modelo Random Forest optimizado
- Análisis de importancia de características
- Validación cruzada para robustez del modelo

### 3. Frontend Moderno
- React 18+ con componentes funcionales y hooks
- Tailwind CSS para diseño responsivo
- Animaciones CSS fluidas y interactivas
- UX/UI optimizada para salud digital

### 4. Integración Full-Stack
- API RESTful para comunicación frontend-backend
- Manejo de estados con React hooks
- Validación de datos bidireccional

## 📈 Métricas del Modelo

```
Modelo: Random Forest Classifier
Accuracy: ~85-90%
Precision: ~87%
Recall: ~83%
F1-Score: ~85%
```

## 👨‍💻 Desarrollador

**Christian Rey Mora López**
- Nutricionista & Analista de Datos
- Especialista en Machine Learning aplicado a salud
- Desarrollador Full-Stack

## 🎯 Impacto y Aplicación

Esta aplicación representa la convergión entre:
- **Ciencia de datos** para análisis predictivo
- **Desarrollo web moderno** para accesibilidad
- **Conocimiento médico** para relevancia clínica
- **UX/UI design** para adopción del usuario

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

---

**Nota**: Esta herramienta es para propósitos educativos e informativos. No reemplaza el consejo médico profesional. Siempre consulta con un profesional de la salud para diagnósticos y tratamientos médicos.
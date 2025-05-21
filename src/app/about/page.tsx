'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Heart, Activity, Lightbulb, Leaf, CheckCircle, Target, ArrowRight, HelpCircle, Users } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    section1: false,
    section2: false,
    section3: false,
    section4: false
  });

  // Animación de entrada para secciones
  useEffect(() => {
    setIsVisible({
      hero: true,
      section1: false,
      section2: false,
      section3: false,
      section4: false
    });
    
    const timers = [
      setTimeout(() => setIsVisible(prev => ({ ...prev, section1: true })), 300),
      setTimeout(() => setIsVisible(prev => ({ ...prev, section2: true })), 600),
      setTimeout(() => setIsVisible(prev => ({ ...prev, section3: true })), 900),
      setTimeout(() => setIsVisible(prev => ({ ...prev, section4: true })), 1200)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Animación para la sección de scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar una vez al inicio
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-light to-white">
      {/* Header Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-r from-primary to-secondary py-16 transition-all duration-1000 transform ${isVisible.hero ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                Acerca de <span className="bg-clip-text text-transparent bg-gradient-to-r from-soft to-soft-light">Vive Sin Resistencia</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-6">
                Descifrando la resistencia a la insulina para mejorar tu salud y calidad de vida a través de la ciencia y la educación.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default" className="bg-soft hover:bg-soft-hover text-bold font-medium hover:text-bold-hover group transition-all duration-300 transform hover:scale-105">
                  <Link href="/" className="flex items-center gap-2">
                    <Heart className="transition-transform duration-300 group-hover:scale-125" size={18} />
                    <span>Evalúa tu Riesgo</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 group transition-all duration-300 transform hover:scale-105">
                  <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" size={16} />
                    <span>Volver al Inicio</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block w-1/3 relative">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-accent to-accent-light rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-br from-bold to-bold-light rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="relative z-10 p-6">
                <Activity className="w-32 h-32 mx-auto text-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Sección 1: ¿Qué es la Resistencia a la Insulina? */}
        <section className={`animate-on-scroll mb-16 transform transition-all duration-1000 ${isVisible.section1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:text-bold transition-all duration-300">
                  <HelpCircle className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-primary group-hover:text-bold transition-colors duration-300 mb-4">¿Qué es la Resistencia a la Insulina?</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    La resistencia a la insulina es una condición en la que las células del cuerpo no responden adecuadamente a la insulina, una hormona clave que regula el azúcar en la sangre. Esto provoca que el páncreas produzca cantidades excesivas de insulina para compensar, lo que puede llevar a niveles elevados de glucosa e insulina en la sangre.
                  </p>
                  <div className="mt-6 bg-soft/30 rounded-lg p-4 border-l-4 border-primary transform transition-all duration-300 group-hover:border-bold">
                    <p className="text-gray-800 italic">
                      "La resistencia a la insulina está asociada con varias condiciones de salud, incluyendo diabetes tipo 2, obesidad, enfermedades cardiovasculares y el síndrome de ovario poliquístico (SOP)."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 2: Relación con SOP */}
        <section className={`animate-on-scroll mb-16 transform transition-all duration-1000 ${isVisible.section2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute w-64 h-64 bg-white/10 rounded-full top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-48 h-48 bg-white/10 rounded-full bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"></div>
                <div className="relative z-10 text-center">
                  <Heart className="w-20 h-20 mx-auto text-white mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white mb-2">Síndrome de Ovario Poliquístico</h3>
                  <p className="text-white/80">Un trastorno hormonal común relacionado con la resistencia a la insulina</p>
                </div>
              </div>
              <div className="md:w-3/5 p-6 md:p-8">
                <h2 className="text-3xl font-bold text-secondary mb-4 group-hover:text-secondary-dark transition-colors duration-300">Relación con el SOP</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  El SOP es un trastorno hormonal común en mujeres en edad reproductiva, caracterizado por desequilibrios hormonales, períodos irregulares y quistes en los ovarios. La resistencia a la insulina es un factor clave en el SOP, ya que puede aumentar los niveles de andrógenos (hormonas masculinas).
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start space-x-3 group/item transition-transform duration-300 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1 group-hover/item:text-secondary-dark transition-colors duration-300" />
                    <div>
                      <h4 className="font-bold text-gray-800">Vello facial y corporal excesivo (hirsutismo)</h4>
                      <p className="text-gray-600">El aumento de andrógenos puede causar crecimiento de vello en áreas como la cara, el pecho y la espalda.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group/item transition-transform duration-300 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1 group-hover/item:text-secondary-dark transition-colors duration-300" />
                    <div>
                      <h4 className="font-bold text-gray-800">Acné y piel grasa</h4>
                      <p className="text-gray-600">Los niveles elevados de andrógenos pueden provocar mayor producción de sebo y problemas en la piel.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group/item transition-transform duration-300 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1 group-hover/item:text-secondary-dark transition-colors duration-300" />
                    <div>
                      <h4 className="font-bold text-gray-800">Caída del cabello</h4>
                      <p className="text-gray-600">Alopecia androgénica con patrones similares a los masculinos.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group/item transition-transform duration-300 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1 group-hover/item:text-secondary-dark transition-colors duration-300" />
                    <div>
                      <h4 className="font-bold text-gray-800">Problemas de fertilidad</h4>
                      <p className="text-gray-600">Ovulaciones irregulares que pueden dificultar lograr un embarazo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 3: Nuestra Herramienta */}
        <section className={`animate-on-scroll mb-16 transform transition-all duration-1000 ${isVisible.section3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:text-accent-dark transition-all duration-300">
                  <Target className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-accent group-hover:text-accent-dark transition-colors duration-300 mb-4">Nuestra Herramienta</h2>
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    La herramienta "Vive Sin Resistencia" utiliza un modelo de aprendizaje automático (Random Forest Classifier) entrenado con datos de la Encuesta Nacional de Salud y Nutrición (NHANES) para evaluar el riesgo de resistencia a la insulina.
                  </p>

                  <div className="bg-gradient-to-r from-accent/10 to-accent-light/20 rounded-xl p-6 mt-4 group-hover:from-accent/20 group-hover:to-accent-light/30 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-accent-dark mb-4">Factores Analizados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center bg-white/60 rounded-lg p-3 shadow-sm transition-transform duration-300 hover:transform hover:scale-105">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                          <span className="font-bold text-accent-dark">01</span>
                        </div>
                        <span className="text-gray-800">Género</span>
                      </div>
                      <div className="flex items-center bg-white/60 rounded-lg p-3 shadow-sm transition-transform duration-300 hover:transform hover:scale-105">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                          <span className="font-bold text-accent-dark">02</span>
                        </div>
                        <span className="text-gray-800">Edad</span>
                      </div>
                      <div className="flex items-center bg-white/60 rounded-lg p-3 shadow-sm transition-transform duration-300 hover:transform hover:scale-105">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                          <span className="font-bold text-accent-dark">03</span>
                        </div>
                        <span className="text-gray-800">Glucosa en sangre</span>
                      </div>
                      <div className="flex items-center bg-white/60 rounded-lg p-3 shadow-sm transition-transform duration-300 hover:transform hover:scale-105">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                          <span className="font-bold text-accent-dark">04</span>
                        </div>
                        <span className="text-gray-800">Niveles de insulina</span>
                      </div>
                      <div className="flex items-center bg-white/60 rounded-lg p-3 shadow-sm transition-transform duration-300 hover:transform hover:scale-105">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                          <span className="font-bold text-accent-dark">05</span>
                        </div>
                        <span className="text-gray-800">Índice de masa corporal (IMC)</span>
                      </div>
                      <div className="flex items-center bg-white/60 rounded-lg p-3 shadow-sm transition-transform duration-300 hover:transform hover:scale-105">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                          <span className="font-bold text-accent-dark">06</span>
                        </div>
                        <span className="text-gray-800">Circunferencia de cintura</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-bold/10 rounded-lg p-6 border-l-4 border-bold">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center">
                        <Users className="h-6 w-6 text-bold" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-bold">Desarrollador</h4>
                        <p className="text-gray-700 mt-2">
                          Este proyecto fue desarrollado por <span className="font-bold text-bold">Christian Rey Mora López</span>, nutricionista y analista de datos, quien diseñó y entrenó el modelo para ofrecer una herramienta accesible y precisa para la prevención y gestión de la resistencia a la insulina.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 4: Cómo Ayudamos */}
        <section className={`animate-on-scroll mb-16 transform transition-all duration-1000 ${isVisible.section4 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-bold mb-8 group-hover:text-bold-hover transition-colors duration-300 text-center">Cómo Ayudamos</h2>
              
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-bold/10 rounded-full mb-4 group-hover:bg-bold/20 transition-all duration-300">
                  <Lightbulb className="h-8 w-8 text-bold" />
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Nuestra misión es empoderar a las personas con información y herramientas para entender y gestionar la resistencia a la insulina, mejorando así su salud y bienestar.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-soft/20 rounded-xl p-6 text-center transition-all duration-300 group/card hover:bg-soft/40 hover:shadow-md hover:-translate-y-2">
                  <div className="h-16 w-16 bg-white rounded-full shadow-md mx-auto mb-4 flex items-center justify-center group-hover/card:bg-soft-hover group-hover/card:text-white transition-colors duration-300">
                    <Target className="h-8 w-8 text-bold" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-4 group-hover/card:text-bold transition-colors duration-300">Evaluaciones personalizadas</h3>
                  <p className="text-gray-700">
                    Análisis de riesgo basado en factores individuales para proporcionar información precisa sobre tu situación.
                  </p>
                </div>

                <div className="bg-soft/20 rounded-xl p-6 text-center transition-all duration-300 group/card hover:bg-soft/40 hover:shadow-md hover:-translate-y-2">
                  <div className="h-16 w-16 bg-white rounded-full shadow-md mx-auto mb-4 flex items-center justify-center group-hover/card:bg-soft-hover group-hover/card:text-white transition-colors duration-300">
                    <Leaf className="h-8 w-8 text-bold" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-4 group-hover/card:text-bold transition-colors duration-300">Consejos prácticos</h3>
                  <p className="text-gray-700">
                    Recomendaciones efectivas para mejorar la sensibilidad a la insulina mediante cambios en el estilo de vida.
                  </p>
                </div>

                <div className="bg-soft/20 rounded-xl p-6 text-center transition-all duration-300 group/card hover:bg-soft/40 hover:shadow-md hover:-translate-y-2">
                  <div className="h-16 w-16 bg-white rounded-full shadow-md mx-auto mb-4 flex items-center justify-center group-hover/card:bg-soft-hover group-hover/card:text-white transition-colors duration-300">
                    <Activity className="h-8 w-8 text-bold" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-4 group-hover/card:text-bold transition-colors duration-300">Educación e información</h3>
                  <p className="text-gray-700">
                    Recursos educativos sobre la resistencia a la insulina y condiciones relacionadas como el SOP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Botón CTA Final */}
        <div className="flex justify-center mt-8 mb-12">
          <Button asChild variant="default" className="bg-bold hover:bg-bold-hover text-white shadow-lg group transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <Link href="/" className="flex items-center gap-2 px-8 py-6">
              <Heart className="transition-transform duration-300 group-hover:scale-125" size={20} />
              <span className="text-lg">Evalúa tu Riesgo Ahora</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Estilos para animaciones de scroll */}
      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.animated {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
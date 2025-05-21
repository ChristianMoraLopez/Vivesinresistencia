import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Home, Info, Menu, X, ChevronDown, Heart, ArrowRight, Mail, Phone } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced heartbeat effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat(true);
      setTimeout(() => setHeartbeat(false), 500);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-soft-light">
      {/* Header / Navigation Bar */}
      <header 
        className={cn(
          'fixed w-full z-50 transition-all duration-500',
          isScrolled 
            ? 'bg-white shadow-md py-2' 
            : 'bg-transparent py-4'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className={cn(
                "text-2xl font-bold flex items-center gap-2 transition-all duration-500 hover:scale-105",
                isScrolled ? "text-primary-dark" : "text-primary"
              )}>
                <Heart 
                  className={cn(
                    "transition-all duration-500",
                    isScrolled ? "text-primary-dark" : "text-primary",
                    heartbeat ? "scale-125" : "scale-100",
                    "animate-pulse"
                  )} 
                  size={28} 
                />
                <span className="font-extrabold transition-all duration-300 hover:text-bold">Vive</span>
                <span className="font-light transition-all duration-300 hover:text-accent">SinResistencia</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-2 font-medium transition-all duration-300 transform hover:scale-110",
                  isScrolled ? "text-primary-dark hover:text-bold" : "text-primary hover:text-bold"
                )}
              >
                <Home size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                <span>Inicio</span>
              </Link>
              <Link
                href="/about"
                className={cn(
                  "flex items-center gap-2 font-medium transition-all duration-300 transform hover:scale-110",
                  isScrolled ? "text-primary-dark hover:text-bold" : "text-primary hover:text-bold"
                )}
              >
                <Info size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                <span>Acerca</span>
              </Link>

              {/* CTA Button */}
              <Button 
                variant="default" 
                size="lg"
                className={cn(
                  "ml-4 transition-all duration-500 transform hover:scale-110 hover:shadow-lg",
                  isScrolled 
                    ? "bg-bold text-white hover:bg-bold-hover" 
                    : "bg-primary text-white hover:bg-primary-hover"
                )}
                asChild
              >
              
              </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                onClick={toggleMobileMenu}
                className={cn(
                  "transition-colors duration-300",
                  isScrolled ? "text-primary-dark hover:text-bold" : "text-primary hover:text-bold"
                )}
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="transition-transform duration-500 rotate-90" />
                ) : (
                  <Menu size={24} className="transition-transform duration-500 hover:rotate-12" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={cn(
            "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
            isMobileMenuOpen 
              ? "max-h-64 opacity-100 mt-4 mb-2" 
              : "max-h-0 opacity-0"
          )}>
            <div className="flex flex-col space-y-4 py-2 px-4 bg-white rounded-lg shadow-lg">
              <Link
                href="/"
                className="group flex items-center gap-2 text-primary-dark hover:text-bold font-medium py-2 transition-all duration-300 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                <span>Inicio</span>
              </Link>
              <Link
                href="/about"
                className="group flex items-center gap-2 text-primary-dark hover:text-bold font-medium py-2 transition-all duration-300 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Info size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                <span>Acerca</span>
              </Link>
              <Button 
                variant="default"
                className="w-full bg-bold text-white hover:bg-bold-hover transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg"
                asChild
              >
               
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with padding for fixed header */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Brand Info */}
            <div>
              <div className="flex items-center gap-2 mb-4 group">
                <Heart className={cn(
                  "text-soft-light transition-transform duration-500", 
                  heartbeat ? "scale-125" : "scale-100",
                  "animate-pulse"
                )} size={24} />
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors duration-300">Vive Sin Resistencia</h3>
              </div>
              <p className="mt-2 text-soft-light leading-relaxed">
                Empoderamos a las personas para prevenir y gestionar la resistencia a la insulina a
                través de herramientas innovadoras y educación. Nuestro objetivo es mejorar la calidad
                de vida y promover hábitos saludables que combatan esta condición.
              </p>
              <div className="mt-6 flex space-x-4">
                {/* Social Media Icons with enhanced animations */}
                <a href="#" className="h-10 w-10 rounded-full bg-primary-light/20 flex items-center justify-center hover:bg-primary-light/40 transition-all duration-300 hover:scale-110 hover:rotate-6">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-primary-light/20 flex items-center justify-center hover:bg-primary-light/40 transition-all duration-300 hover:scale-110 hover:rotate-6">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-primary-light/20 flex items-center justify-center hover:bg-primary-light/40 transition-all duration-300 hover:scale-110 hover:rotate-6">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 group transition-all duration-300 hover:text-accent">Contáctanos</h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-soft-light group">
                  <Mail className="flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" size={20} />
                  <a href="mailto:info@vivesinresistencia.com" className="hover:text-white transition-all duration-300 hover:underline">
                    info@vivesinresistencia.com
                  </a>
                </p>
                <p className="flex items-center gap-3 text-soft-light group">
                  <Phone className="flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" size={20} />
                  <a href="tel:+1234567890" className="hover:text-white transition-all duration-300 hover:underline">
                    +1 (234) 567-890
                  </a>
                </p>
                
                <div className="pt-4 mt-4 border-t border-primary-light/20">
                  <h4 className="font-medium mb-2 hover:text-accent transition-colors duration-300">Enlaces Rápidos</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/" className="text-soft-light hover:text-white flex items-center gap-2 transition-all duration-300 hover:translate-x-2 group">
                      <Home size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span>Inicio</span>
                    </Link>
                    <Link href="/about" className="text-soft-light hover:text-white flex items-center gap-2 transition-all duration-300 hover:translate-x-2 group">
                      <Info size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span>Acerca</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-primary-light/20 pt-6 text-center text-soft-light">
            <p className="hover:text-white transition-colors duration-300">&copy; {new Date().getFullYear()} Vive Sin Resistencia. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
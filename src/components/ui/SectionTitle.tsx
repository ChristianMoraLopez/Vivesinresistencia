import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, subtitle, centered = false, className = '' }) => {
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} mb-8 ${className}`}>
      <h2 className="text-3xl font-bold text-primary sm:text-4xl">{children}</h2>
      {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
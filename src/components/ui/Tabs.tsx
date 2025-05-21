import React, { createContext, useContext, ReactNode } from 'react';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, className }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className }) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }
  const { value: currentValue, onValueChange } = context;

  return (
    <button
      onClick={() => onValueChange(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        currentValue === value
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className }) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }
  const { value: currentValue } = context;

  return currentValue === value ? <div className={className}>{children}</div> : null;
};
'use client';

import React, { createContext, useContext } from 'react';
import { type Locale } from '@/i18n';

interface IntlContextType {
  locale: Locale;
  messages: Record<string, any>;
  t: (key: string) => string;
}

const IntlContext = createContext<IntlContextType | null>(null);

interface IntlProviderProps {
  children: React.ReactNode;
  locale: Locale;
  messages: Record<string, any>;
}

export function IntlProvider({ children, locale, messages }: IntlProviderProps) {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = messages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // 返回原始键作为后备
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const contextValue: IntlContextType = {
    locale,
    messages,
    t,
  };

  return (
    <IntlContext.Provider value={contextValue}>
      {children}
    </IntlContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const context = useContext(IntlContext);
  if (!context) {
    throw new Error('useTranslations must be used within an IntlProvider');
  }

  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return context.t(fullKey);
  };
}

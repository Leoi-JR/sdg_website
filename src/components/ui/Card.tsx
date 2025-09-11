'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick,
}) => {
  const baseClasses = 'bg-[#1a1a1f] border border-[#2a2a2f] rounded-xl p-6 transition-all duration-300';
  const hoverClasses = hover ? 'hover:border-[#00d4ff]/50 hover:shadow-lg hover:shadow-[#00d4ff]/10' : '';
  const glowClasses = glow ? 'shadow-lg shadow-[#00d4ff]/20 border-[#00d4ff]/30' : '';

  const combinedClasses = `${baseClasses} ${hoverClasses} ${glowClasses} ${className}`.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5 } : {}}
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;

import React from 'react';
import { LogoAnimation } from './LogoAnimation';
import { LogoImage } from './LogoImage';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

const sizes = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-40 h-40',
  xl: 'w-48 h-48'
};

export function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <LogoAnimation className={`${sizes[size]} ${className}`}>
      <LogoImage />
    </LogoAnimation>
  );
}
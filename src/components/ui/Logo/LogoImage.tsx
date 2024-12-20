import React from 'react';

type LogoImageProps = {
  className?: string;
};

export function LogoImage({ className = '' }: LogoImageProps) {
  return (
    <img
      src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/miniceo-logo.png"
      alt="MiniCEO"
      className={`w-full h-full object-contain ${className}`}
      draggable={false}
    />
  );
}
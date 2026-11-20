import React from 'react';
import { colors, typography } from '../tokens.js';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'platform';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          background: colors.client.primary,
          color: '#FFFFFF',
          border: 'none'
        };
      case 'platform':
        return {
          background: colors.platform.primary,
          color: '#FFFFFF',
          border: 'none'
        };
      case 'danger':
        return {
          background: '#DC2626',
          color: '#FFFFFF',
          border: 'none'
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: colors.client.textMain,
          border: 'none'
        };
      case 'secondary':
      default:
        return {
          background: '#FFFFFF',
          color: colors.client.textMain,
          border: `1px solid ${colors.client.border}`
        };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          minHeight: '34px',
          padding: '0 12px',
          fontSize: '13px',
          borderRadius: '6px'
        };
      case 'lg':
        return {
          minHeight: '44px',
          padding: '0 20px',
          fontSize: '15px',
          borderRadius: '8px'
        };
      case 'md':
      default:
        return {
          minHeight: '38px',
          padding: '0 16px',
          fontSize: '14px',
          borderRadius: '7px'
        };
    }
  };

  const baseStyles: React.CSSProperties = {
    fontFamily: typography.fontFamily,
    fontWeight: 600,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxSizing: 'border-box',
    lineHeight: typography.gujaratiLineHeight,
    transition: 'background 0.15s ease, opacity 0.15s ease',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style
  };

  return (
    <button disabled={disabled || isLoading} style={baseStyles} {...props}>
      {isLoading ? <span>⌛</span> : null}
      {children}
    </button>
  );
};


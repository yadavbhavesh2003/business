import React from 'react';
import { typography } from '../tokens.js';

export interface TabularNumProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

/**
 * TabularNum Component:
 * Enforces monospaced numeric figures so columns of numbers and decimals align vertically.
 */
export const TabularNum: React.FC<TabularNumProps> = ({
  children,
  align = 'right',
  style,
  ...props
}) => {
  return (
    <span
      style={{
        fontVariantNumeric: 'tabular-nums',
        textAlign: align,
        display: align === 'right' ? 'block' : 'inline',
        fontFamily: typography.fontFamily,
        ...style
      }}
      {...props}
    >
      {children}
    </span>
  );
};


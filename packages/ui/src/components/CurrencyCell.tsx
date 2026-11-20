import React from 'react';
import { formatInr } from '@udyamos/core';
import { TabularNum } from './TabularNum.js';

export interface CurrencyCellProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  includeSymbol?: boolean;
  highlightNegative?: boolean;
}

/**
 * CurrencyCell Component:
 * Formats financial numbers in Indian Lakhs/Crores (₹ 12,34,567.00) with tabular alignment.
 */
export const CurrencyCell: React.FC<CurrencyCellProps> = ({
  amount,
  includeSymbol = true,
  highlightNegative = true,
  style,
  ...props
}) => {
  const formatted = formatInr(amount, includeSymbol);
  const isNegative = amount < 0;

  return (
    <TabularNum
      align="right"
      style={{
        color: isNegative && highlightNegative ? '#DC2626' : undefined,
        fontWeight: 500,
        ...style
      }}
      {...props}
    >
      {formatted}
    </TabularNum>
  );
};


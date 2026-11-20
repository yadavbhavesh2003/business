import React from 'react';
import { colors, typography } from '../tokens.js';

export interface KpiCardProps {
  label: string;
  value: string;
  note?: string;
  noteTone?: 'success' | 'warning' | 'danger' | 'neutral';
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  note,
  noteTone = 'neutral',
  onClick
}) => {
  const getNoteColor = (): string => {
    switch (noteTone) {
      case 'success':
        return '#059669';
      case 'warning':
        return '#D97706';
      case 'danger':
        return '#DC2626';
      case 'neutral':
      default:
        return colors.client.textMuted;
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        background: '#FFFFFF',
        borderRadius: '10px',
        padding: '16px 20px',
        border: `1px solid ${colors.client.border}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        boxSizing: 'border-box',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: typography.fontFamily,
        transition: 'transform 0.1s ease, box-shadow 0.1s ease'
      }}
    >
      <span
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: colors.client.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: colors.client.textMain,
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {value}
      </span>
      {note ? (
        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: getNoteColor(),
            lineHeight: typography.gujaratiLineHeight
          }}
        >
          {note}
        </span>
      ) : null}
    </div>
  );
};


import React from 'react';
import { colors, typography } from '../tokens.js';

export type StatusType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'approved'
  | 'pending'
  | 'conflict'
  | 'overdue'
  | 'void';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: StatusType;
  label?: string;
  children?: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = 'neutral',
  label,
  children,
  style,
  ...props
}) => {
  const getBadgeColors = (): { bg: string; text: string } => {
    switch (status) {
      case 'success':
      case 'approved':
        return { bg: colors.status.successBg, text: colors.status.successText };
      case 'warning':
      case 'pending':
        return { bg: colors.status.warningBg, text: colors.status.warningText };
      case 'danger':
      case 'conflict':
      case 'overdue':
        return { bg: colors.status.dangerBg, text: colors.status.dangerText };
      case 'info':
        return { bg: colors.status.infoBg, text: colors.status.infoText };
      case 'neutral':
      case 'void':
      default:
        return { bg: colors.status.neutralBg, text: colors.status.neutralText };
    }
  };

  const { bg, text } = getBadgeColors();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 600,
        background: bg,
        color: text,
        fontFamily: typography.fontFamily,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        ...style
      }}
      {...props}
    >
      {label || children}
    </span>
  );
};


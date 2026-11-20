import React from 'react';
import { colors, typography } from '../tokens.js';

export interface ColumnDef<T> {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
  render?: (row: T) => React.ReactNode;
}

export interface ERPTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  emptyMessage?: string;
}

export function ERPTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No records found'
}: ERPTableProps<T>) {
  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        background: '#FFFFFF',
        borderRadius: '8px',
        border: `1px solid ${colors.client.border}`,
        boxSizing: 'border-box'
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: typography.fontFamily,
          fontSize: '13px',
          textAlign: 'left'
        }}
      >
        <thead>
          <tr
            style={{
              background: '#F8FAFC',
              borderBottom: `1px solid ${colors.client.border}`
            }}
          >
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: '10px 14px',
                  fontWeight: 600,
                  color: colors.client.textMuted,
                  textAlign: col.align || 'left',
                  width: col.width,
                  whiteSpace: 'nowrap'
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: '32px',
                  textAlign: 'center',
                  color: colors.client.textMuted
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={keyExtractor(row, idx)}
                style={{
                  borderBottom:
                    idx === data.length - 1
                      ? 'none'
                      : `1px solid ${colors.client.border}`,
                  background: idx % 2 === 1 ? '#FAFAFA' : '#FFFFFF',
                  transition: 'background 0.1s ease'
                }}
              >
                {columns.map((col) => {
                  const content = col.render
                    ? col.render(row)
                    : (row as any)[col.key];
                  return (
                    <td
                      key={col.key}
                      style={{
                        padding: '10px 14px',
                        textAlign: col.align || 'left',
                        color: colors.client.textMain,
                        lineHeight: typography.gujaratiLineHeight
                      }}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


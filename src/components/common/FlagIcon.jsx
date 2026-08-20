import React from 'react';

const SIZE_MAP = {
  xs: { width: '18px', height: '13px', borderRadius: '2px' },
  sm: { width: '24px', height: '18px', borderRadius: '2px' },
  md: { width: '30px', height: '22px', borderRadius: '3px' },
  lg: { width: '40px', height: '30px', borderRadius: '3px' },
  xl: { width: '56px', height: '42px', borderRadius: '4px' },
};
const CODE_MAP = { el: 'gr', uk: 'gb', eu: 'eu' };

export default function FlagIcon({ code, size = 'md', className = '', title, style = {} }) {
  if (!code) return null;
  const normalized = CODE_MAP[code.toLowerCase()] ?? code.toLowerCase();
  const dim = SIZE_MAP[size] ?? SIZE_MAP.md;
  return (
    <span
      className={`fi fi-${normalized} ${className}`}
      style={{ ...dim, display: 'inline-block', backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0, ...style }}
      title={title ?? normalized.toUpperCase()}
      role="img"
      aria-label={title ?? normalized.toUpperCase()}
    />
  );
}

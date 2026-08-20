import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

/**
 * Config-driven comparative table (Excel-like): sticky header, column sort,
 * zebra rows, click-to-open. Numeric columns right-align + tabular.
 *
 * columns: [{ key, label, align?, sortable?, width?, render?(row), value?(row), className? }]
 */
export default function DataTable({ rows, columns, onRowClick, initialSort, getKey }) {
  const [sort, setSort] = useState(initialSort || { key: columns.find((c) => c.sortable !== false)?.key, dir: 'desc' });

  const sorted = useMemo(() => {
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const val = col.value || ((r) => r[col.key]);
    const dir = sort.dir === 'desc' ? -1 : 1;
    return [...rows].sort((a, b) => {
      let va = val(a), vb = val(b);
      const na = va == null || va === '—' || va === '', nb = vb == null || vb === '—' || vb === '';
      if (na && nb) return 0;
      if (na) return 1; if (nb) return -1;            // empties ALWAYS last
      const cmp = (typeof va === 'number' && typeof vb === 'number')
        ? va - vb : String(va).localeCompare(String(vb), 'fr', { numeric: true });
      return cmp * dir;
    });
  }, [rows, columns, sort]);

  const toggleSort = (key) => setSort((s) => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });

  return (
    <div className="panel overflow-auto max-h-[72vh]">
      <table className="w-full text-xs border-collapse">
        <thead className="sticky top-0 z-10">
          <tr className="bg-slate-900/95 backdrop-blur border-b border-slate-700">
            {columns.map((c) => {
              const active = sort.key === c.key;
              const Icon = !active ? ChevronsUpDown : sort.dir === 'asc' ? ChevronUp : ChevronDown;
              return (
                <th key={c.key}
                  onClick={c.sortable === false ? undefined : () => toggleSort(c.key)}
                  style={{ width: c.width, textAlign: c.align || 'left' }}
                  className={`px-2.5 py-2 font-bold text-[10px] uppercase tracking-wider whitespace-nowrap ${
                    c.sortable === false ? 'text-slate-500' : 'text-slate-400 cursor-pointer hover:text-white select-none'} ${active ? 'text-blue-300' : ''}`}>
                  <span className="inline-flex items-center gap-1" style={{ flexDirection: c.align === 'right' ? 'row-reverse' : 'row' }}>
                    {c.label}{c.sortable !== false && <Icon size={11} className={active ? 'text-blue-400' : 'text-slate-600'} />}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, ri) => (
            <tr key={getKey ? getKey(row) : ri}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-b border-slate-800/60 ${ri % 2 ? 'bg-slate-900/30' : ''} ${onRowClick ? 'cursor-pointer hover:bg-slate-800/50' : ''}`}>
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align || 'left' }}
                  className={`px-2.5 py-1.5 ${c.align === 'right' ? 'tabular text-slate-300' : 'text-slate-200'} ${c.className || ''}`}>
                  {c.render ? c.render(row) : (row[c.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {sorted.length === 0 && <div className="p-8 text-center text-slate-500 text-sm">Aucune donnée.</div>}
    </div>
  );
}

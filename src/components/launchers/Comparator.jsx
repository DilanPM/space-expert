import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { launcherById } from '../../data/index.js';
import { Badge, statusTone } from '../common/ui.jsx';
import SpaceImage from '../common/SpaceImage.jsx';

const fmt = (n) => (n == null ? '—' : n.toLocaleString('fr-FR'));
const ROWS = [
  ['Catégorie', (l) => l.category], ['Statut', (l) => l.status],
  ['Charge LEO (kg)', (l) => fmt(l.capLEO)], ['Charge SSO (kg)', (l) => fmt(l.capSSO)],
  ['Charge GTO (kg)', (l) => fmt(l.capGTO)], ['Charge GEO (kg)', (l) => fmt(l.capGEO)],
  ['Prix (M$)', (l) => fmt(l.priceCatalogueMUSD)], ['$/kg LEO (k$)', (l) => fmt(l.priceLEOkUSDkg)],
  ['TRL', (l) => l.trl ?? '—'], ['Réutilisable', (l) => l.reusability || '—'],
  ['Ergol 1er étage', (l) => l.propStage1 || '—'], ['Boosters', (l) => l.booster || '—'],
  ['Maiden', (l) => l.maidenLaunch || '—'], ['Spaceport/pad', (l) => l.spaceportPad || '—'],
];
const COLORS = ['#60a5fa', '#fbbf24', '#34d399', '#f472b6'];

export default function Comparator({ ids, onClose }) {
  const ls = ids.map((id) => launcherById[id]).filter(Boolean);
  const chartData = ls.map((l, i) => ({ name: l.name.slice(0, 14), LEO: l.capLEO || 0, GTO: l.capGTO || 0, fill: COLORS[i] }));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3" onClick={onClose}>
      <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-950 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <header className="flex items-center justify-between px-4 h-12 border-b border-slate-800 flex-shrink-0">
          <h3 className="font-bold text-white text-sm">⚖️ Comparateur de lanceurs</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"><X size={18} /></button>
        </header>
        <div className="overflow-auto p-4">
          {/* header cards */}
          <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: `repeat(${ls.length}, minmax(0,1fr))` }}>
            {ls.map((l, i) => (
              <div key={l.id} className="panel overflow-hidden">
                <SpaceImage query={l.wiki} alt={l.name} contain className="h-24 border-b border-slate-800" />
                <div className="p-2">
                  <div className="font-bold text-white text-xs truncate" style={{ color: COLORS[i] }}>{l.name}</div>
                  <div className="flex gap-1 mt-1"><Badge tone={statusTone(l.status)}>{l.statusGroup}</Badge>{l.isEU && <Badge tone="gold">EU</Badge>}</div>
                </div>
              </div>
            ))}
          </div>

          {/* chart */}
          <div className="panel p-3 mb-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Capacité d'emport (kg)</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} cursor={{ fill: '#1e293b55' }} />
                <Bar dataKey="LEO" radius={[4, 4, 0, 0]}>{chartData.map((d, i) => <Cell key={i} fill={d.fill} />)}</Bar>
                <Bar dataKey="GTO" radius={[4, 4, 0, 0]} fillOpacity={0.45}>{chartData.map((d, i) => <Cell key={i} fill={d.fill} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* table */}
          <div className="panel overflow-hidden">
            <table className="w-full text-xs">
              <tbody>
                {ROWS.map(([label, fn], ri) => (
                  <tr key={label} className={ri % 2 ? 'bg-slate-900/40' : ''}>
                    <td className="px-3 py-2 text-slate-500 font-semibold w-36 align-top">{label}</td>
                    {ls.map((l) => <td key={l.id} className="px-3 py-2 text-slate-200 align-top tabular">{fn(l)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

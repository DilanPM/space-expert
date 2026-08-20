import React from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { institutions, companies, governanceTriangle } from '../../data/index.js';
import { SectionHeader, Badge } from '../common/ui.jsx';
import FlagIcon from '../common/FlagIcon.jsx';

function Triangle({ onOpen }) {
  const pts = { 'ec-defis': [250, 40], 'esa': [60, 320], 'euspa': [440, 320] };
  const { nodes, edges } = governanceTriangle;
  return (
    <div className="panel p-4 grid-bg">
      <svg viewBox="0 0 500 400" className="w-full" style={{ maxHeight: 420 }}>
        {edges.map((e, i) => {
          const [x1, y1] = pts[e.from], [x2, y2] = pts[e.to];
          const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth={2} strokeDasharray="5 4" />
              <rect x={mx - 70} y={my - 11} width={140} height={22} rx={5} fill="#0b1f38" stroke="#1e293b" />
              <text x={mx} y={my + 3} textAnchor="middle" fill="#94a3b8" fontSize="9">{e.label.slice(0, 32)}</text>
            </g>
          );
        })}
        {nodes.map((n) => {
          const [x, y] = pts[n.id];
          return (
            <g key={n.id} transform={`translate(${x},${y})`} style={{ cursor: 'pointer' }} onClick={() => onOpen('institution', n.id)}>
              <circle r={52} fill="#0f172a" stroke={n.color} strokeWidth={2.5} />
              <text textAnchor="middle" y={-8} fill="#fff" fontSize="15" fontWeight="bold">{n.label.split(' ')[0]}</text>
              <text textAnchor="middle" y={8} fill={n.color} fontSize="8" fontWeight="bold">{n.role.split(' ')[0]}</text>
              <text textAnchor="middle" y={20} fill="#64748b" fontSize="7">{n.sub}</text>
            </g>
          );
        })}
      </svg>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {nodes.map((n) => (
          <button key={n.id} onClick={() => onOpen('institution', n.id)} className="text-center p-2 rounded-lg hover:bg-slate-900">
            <div className="text-xs font-bold" style={{ color: n.color }}>{n.label}</div>
            <div className="text-[10px] text-slate-500">{n.role}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GovernanceModule() {
  const open = useAppStore((s) => s.openEntity);
  const agencies = institutions.filter((i) => i.tier === 'national');
  const byType = (t) => companies.filter((c) => c.type === t);

  return (
    <>
      <SectionHeader emoji="🏛️" title="Gouvernance & Écosystème"
        subtitle="Qui fait quoi — le triangle EC / ESA / EUSPA, agences nationales & industrie" />

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Le triangle décisionnel</div>
          <Triangle onOpen={open} />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Agences nationales</div>
          <div className="space-y-2">
            {agencies.map((a) => (
              <button key={a.id} onClick={() => open('institution', a.id)} className="panel p-3 w-full text-left hover:border-slate-600">
                <div className="flex items-center gap-2">
                  <FlagIcon code={a.flag} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm">{a.short} <span className="text-slate-500 font-normal text-xs">· {a.hq.city}</span></div>
                    <div className="text-[11px] text-slate-400 truncate">{a.role}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Industry */}
      <div className="mt-5">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Industrie</div>
        {[['prime', 'Maîtres d\'œuvre & intégrateurs'], ['launch-services', 'Services de lancement'], ['new-entrant', 'New Space · nouveaux entrants']].map(([type, label]) => (
          <div key={type} className="mb-3">
            <Badge tone="indigo">{label}</Badge>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
              {byType(type).map((c) => (
                <button key={c.id} onClick={() => open('company', c.id)} className="panel p-3 text-left hover:border-slate-600">
                  <div className="flex items-center gap-2">
                    <FlagIcon code={c.flag} size="sm" />
                    <span className="font-bold text-white text-sm">{c.name}</span>
                    {c.status === 'withdrawn' && <Badge tone="red">retiré</Badge>}
                    {c.elc && <Badge tone="gold">ELC</Badge>}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">{c.role}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

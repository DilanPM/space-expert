import React, { useState } from 'react';
import { ChevronDown, Flame } from 'lucide-react';
import { propulsion } from '../../data/index.js';
import { Badge } from '../common/ui.jsx';

const SCOPES = [
  ['launcher-use', "Propulsion lanceurs — par usage", 'blue'],
  ['launcher-tech', 'Technologies de propulsion', 'amber'],
  ['satellite', 'Propulsion satellites', 'indigo'],
];

function Card({ p }) {
  const [open, setOpen] = useState(false);
  const entries = Object.entries(p.fields);
  const [first, ...rest] = entries;
  return (
    <div className="panel overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-start justify-between gap-2 p-3 text-left hover:bg-slate-900/50">
        <div className="flex items-start gap-2 min-w-0">
          <Flame size={15} className="text-orange-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <div className="font-bold text-white text-sm">{p.title}</div>
            {!open && rest[0] && <div className="text-[11px] text-slate-500 truncate mt-0.5">{rest[0][1]}</div>}
          </div>
        </div>
        <ChevronDown size={16} className={`text-slate-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-2 border-t border-slate-800 pt-2">
          {rest.map(([k, v]) => (
            <div key={k}>
              <div className="text-[10px] uppercase tracking-wider text-blue-400 font-bold mb-0.5">{k}</div>
              <div className="text-xs text-slate-300 leading-relaxed">{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropulsionTab() {
  return (
    <div className="space-y-5">
      <div className="panel p-3 grid-bg">
        <p className="text-sm text-slate-300 leading-relaxed">
          Cartographie de la propulsion européenne — moteurs solides (<b className="text-amber-300">P120C</b> partagé Ariane 6/Vega-C),
          cryogéniques (<b className="text-blue-300">Vulcain 2.1</b>, <b className="text-blue-300">Vinci</b>), réutilisables
          (<b className="text-green-300">Prometheus</b>, Themis), méthane (<b className="text-green-300">M10</b> Vega-E), avec
          positionnement UE, risques supply-chain et mitigations recommandées.
        </p>
      </div>
      {SCOPES.map(([scope, label, tone]) => {
        const items = propulsion.filter((p) => p.scope === scope);
        if (!items.length) return null;
        return (
          <div key={scope}>
            <div className="flex items-center gap-2 mb-2">
              <Badge tone={tone}>{label}</Badge><span className="text-[11px] text-slate-600">{items.length}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">{items.map((p) => <Card key={p.id} p={p} />)}</div>
          </div>
        );
      })}
    </div>
  );
}

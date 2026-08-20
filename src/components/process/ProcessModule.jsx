import React, { useState } from 'react';
import { SectionHeader, Badge } from '../common/ui.jsx';
import { lifecycle } from '../../data/curated/process.js';

export default function ProcessModule() {
  const [active, setActive] = useState(lifecycle[0].id);
  const phase = lifecycle.find((p) => p.id === active);

  return (
    <>
      <SectionHeader emoji="🛠️" title="Process & Cycle de vie"
        subtitle="De la conception à la fin de vie — comment on construit, assemble, lance et opère un système spatial" />

      {/* Phase rail */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {lifecycle.map((p, i) => (
          <button key={p.id} onClick={() => setActive(p.id)}
            className={`flex-shrink-0 panel px-3 py-2 text-left transition-all min-w-[140px] ${active === p.id ? 'border-blue-500 bg-slate-800' : 'hover:border-slate-600'}`}>
            <div className="text-lg">{p.icon}</div>
            <div className="text-xs font-bold text-white mt-0.5 leading-tight">{p.phase}</div>
            <div className="text-[10px] text-slate-500">{p.duration}</div>
            {i < lifecycle.length - 1 && <div className="absolute" />}
          </button>
        ))}
      </div>

      {/* Detail */}
      {phase && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 panel p-5 grid-bg" style={{ borderColor: phase.color + '40' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl">{phase.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-white">{phase.phase}</h3>
                <div className="text-xs" style={{ color: phase.color }}>Durée typique : {phase.duration}</div>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">{phase.desc}</p>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Étapes clés</div>
            <div className="space-y-2">
              {phase.steps.map((st, i) => (
                <div key={i} className="flex items-center gap-3 panel p-2.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: phase.color + '22', color: phase.color }}>{i + 1}</div>
                  <span className="text-sm text-slate-200">{st}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Acteurs impliqués</div>
            <div className="space-y-2">
              {phase.actors.map((a) => <div key={a} className="panel p-2.5 text-sm text-slate-200">{a}</div>)}
            </div>
            <div className="panel p-3 mt-3">
              <div className="text-[11px] text-slate-500 mb-1">Progression dans le cycle</div>
              <div className="flex gap-1">
                {lifecycle.map((p) => <div key={p.id} className="h-1.5 flex-1 rounded-full" style={{ background: p.id === active ? phase.color : '#1e293b' }} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

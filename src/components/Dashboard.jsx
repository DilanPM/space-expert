import React, { useState } from 'react';
import { Rocket, Globe2, Radar, Scale, Building2, Beaker, Map, Workflow, Satellite, TrendingUp, Trash2, Radio, CheckCircle2, ChevronDown } from 'lucide-react';
import { useAppStore } from '../store/useAppStore.js';
import { launchers, spaceports, spaceStats, launchLog, launches, launchStats, launcherById } from '../data/index.js';
import { spaceAct } from '../data/curated/policy.js';
import { StatCard, Badge } from './common/ui.jsx';

function statValue(re) {
  const row = spaceStats.find((s) => re.test((s.stat || '').toLowerCase()));
  return row?.value;
}

const QUICK = [
  { mode: 'launchers', icon: Rocket, label: 'Lanceurs & Propulsion', color: '#60a5fa', desc: 'Base mondiale & EU, comparateur' },
  { mode: 'csg', icon: Radar, label: 'CSG — Kourou', color: '#fbbf24', desc: 'Pas de tir, Ariane 6' },
  { mode: 'map', icon: Map, label: 'Carte stratégique', color: '#34d399', desc: 'Sites, institutions, industriels' },
  { mode: 'spaceports', icon: Globe2, label: 'Spaceports', color: '#f472b6', desc: '10 ports européens' },
  { mode: 'governance', icon: Building2, label: 'Gouvernance', color: '#a78bfa', desc: 'EC · ESA · EUSPA' },
  { mode: 'policy', icon: Scale, label: 'Politique & Budget', color: '#22d3ee', desc: 'Space Act · ECF · FFPA' },
  { mode: 'materials', icon: Beaker, label: 'Matières critiques', color: '#fb923c', desc: 'REACH · PFAS · supply' },
  { mode: 'process', icon: Workflow, label: 'Cycle de vie', color: '#94a3b8', desc: 'Design → opérations' },
];

const OUT = {
  success: { tone: 'green', label: 'succès' }, partial: { tone: 'amber', label: 'partiel' },
  failure: { tone: 'red', label: 'échec' }, upcoming: { tone: 'blue', label: 'à venir' },
};

export default function Dashboard() {
  const go = useAppStore((s) => s.setViewMode);
  const open = useAppStore((s) => s.openEntity);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const euL = launchers.filter((l) => l.isEU);
  const opEU = euL.filter((l) => l.statusGroup === 'active').length;
  const devEU = euL.filter((l) => l.statusGroup === 'dev').length;
  const debris = statValue(/debir|debris|débris/) || '36 000';
  const sorted = [...launches].sort((a, b) => String(b.date).localeCompare(String(a.date)));

  return (
    <div className="space-y-4">
      {/* Hero / live */}
      <div className="panel p-5 grid-bg relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-lg shadow-blue-500/30"><Satellite size={22} className="text-white" /></div>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-white">EU Access to Space — Tour de contrôle</h1>
            <p className="text-sm text-slate-400 mt-0.5">Single Source of Truth · lanceurs, spaceports, infrastructures, politique & gouvernance spatiale européenne · DG DEFIS D1</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
          <Radio size={15} className="text-green-400 animate-pulse-dot flex-shrink-0" />
          <span className="text-xs text-slate-200"><b className="text-green-300">Live · juin 2026</b> — Isar Aerospace tente le 2ᵉ vol de <b>Spectrum</b> (Andøya). Côté CSG, Ariane 6 enchaîne les vols Kuiper (VA268/269).</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Lanceurs EU" value={euL.length} sub={`${opEU} opérationnels · ${devEU} en dev.`} icon={Rocket} tone="blue" onClick={() => go('launchers')} />
        <StatCard label="Lancements 24-26" value={`${launchStats.success}/${launchStats.total}`} unit="succès" sub={`${launchStats.upcoming} à venir`} icon={CheckCircle2} tone="green" />
        <StatCard label="Spaceports EU" value={spaceports.length} sub="ports & ranges européens" icon={Globe2} tone="amber" onClick={() => go('spaceports')} />
        <StatCard label="Débris suivis" value={debris} unit="objets" sub="ESA DISCOS" icon={Trash2} tone="red" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Launches + quick nav */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Modules</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {QUICK.map((q) => (
                <button key={q.mode} onClick={() => go(q.mode)} className="panel p-3 text-left hover:border-slate-600 transition-all group">
                  <q.icon size={20} style={{ color: q.color }} />
                  <div className="text-sm font-bold text-white mt-2 group-hover:text-blue-300 transition-colors">{q.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{q.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Verified launch log */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5"><TrendingUp size={13} />Lancements européens 2024-2026 <Badge tone="green">✓ vérifié</Badge></div>
            <div className="panel divide-y divide-slate-800/70 max-h-[28rem] overflow-y-auto">
              {sorted.map((m) => {
                const o = OUT[m.outcome];
                return (
                  <div key={m.id} className={`flex items-center gap-3 px-3 py-2 ${m.outcome === 'upcoming' ? 'bg-blue-500/5' : ''}`}>
                    <span className="text-[11px] text-slate-500 tabular w-20 flex-shrink-0">{m.date}</span>
                    <button onClick={() => launcherById[m.launcher] && open('launcher', m.launcher)} className="text-[11px] font-bold text-blue-300 hover:text-blue-200 w-28 flex-shrink-0 text-left truncate">{m.flight} · {m.launcherName}</button>
                    <span className="text-xs text-slate-300 flex-1 truncate">{m.payload}</span>
                    <span className="hidden md:inline text-[10px] text-slate-600 w-24 truncate flex-shrink-0">{m.site}</span>
                    <Badge tone={o.tone}>{o.label}</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Copernicus roadmap (from internal Excel) */}
          {launchLog.length > 0 && (
            <div className="panel overflow-hidden">
              <button onClick={() => setShowRoadmap((v) => !v)} className="w-full flex items-center justify-between p-3 hover:bg-slate-900/50">
                <span className="text-sm font-bold text-white flex items-center gap-2"><Satellite size={14} className="text-blue-400" />Roadmap missions Copernicus / Sentinel <Badge tone="slate">~ DB interne</Badge></span>
                <ChevronDown size={16} className={`text-slate-500 transition-transform ${showRoadmap ? 'rotate-180' : ''}`} />
              </button>
              {showRoadmap && (
                <div className="divide-y divide-slate-800/70 border-t border-slate-800 max-h-72 overflow-y-auto">
                  {launchLog.slice(0, 20).map((m, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2">
                      <span className="text-[11px] text-slate-500 tabular w-20 flex-shrink-0">{(m.launchDate || m.year || '').slice(0, 10)}</span>
                      <span className="text-sm text-slate-200 flex-1 truncate">{m.name}</span>
                      {m.launcher && <Badge tone="blue">{m.launcher}</Badge>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Policy tracker */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Tracker — {spaceAct.title}</div>
          <button onClick={() => go('policy')} className="panel p-4 w-full text-left hover:border-slate-600">
            <div className="flex items-center justify-between mb-3"><span className="text-sm font-bold text-white">EU Space Act</span><Badge tone="amber">en cours</Badge></div>
            <div className="space-y-2">
              {spaceAct.stages.map((st, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${st.done ? 'bg-green-400' : 'bg-slate-700'}`} />
                  <span className={`text-[11px] ${st.done ? 'text-slate-200' : 'text-slate-500'}`}>{st.label}</span>
                  <span className="ml-auto text-[9px] text-slate-600">{st.date}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2">
              {spaceAct.pillars.map((p) => <div key={p.id} className="text-center"><div className="text-[10px] font-bold" style={{ color: p.color }}>{p.label.split(' ')[0]}</div></div>)}
            </div>
          </button>

          <div className="panel p-4 mt-3">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Acteurs clés</div>
            <div className="flex flex-wrap gap-1.5">
              {['ec-defis', 'esa', 'euspa'].map((id) => (
                <button key={id} onClick={() => open('institution', id)} className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-200 hover:border-blue-500/50">{id === 'ec-defis' ? 'DG DEFIS' : id.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

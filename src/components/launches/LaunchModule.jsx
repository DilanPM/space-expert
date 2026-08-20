import React, { useState, useMemo } from 'react';
import { Rocket, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import { launches, launchStats, launcherById } from '../../data/index.js';
import { SectionHeader, Badge, Pill, StatCard } from '../common/ui.jsx';

const PROGRAMS = {
  Galileo: '#fbbf24', Copernicus: '#34d399', 'IRIS²': '#a78bfa', Défense: '#ef4444',
  Commercial: '#60a5fa', 'Science/Météo': '#22d3ee', Autre: '#94a3b8',
};
function programOf(l) {
  const t = `${l.payload} ${l.launcherName}`.toLowerCase();
  if (/galileo/.test(t)) return 'Galileo';
  if (/sentinel|copernicus|biomass|co3d|microcarb/.test(t)) return 'Copernicus';
  if (/iris/.test(t)) return 'IRIS²';
  if (/cso|défense|armées|military/.test(t)) return 'Défense';
  if (/kuiper|amazon/.test(t)) return 'Commercial';
  if (/smile|metop|eumetsat|kompsat/.test(t)) return 'Science/Météo';
  return 'Autre';
}
const OUT = {
  success: { tone: 'green', label: 'succès', icon: CheckCircle2 }, partial: { tone: 'amber', label: 'partiel', icon: AlertTriangle },
  failure: { tone: 'red', label: 'échec', icon: XCircle }, upcoming: { tone: 'blue', label: 'à venir', icon: Clock },
};

export default function LaunchModule() {
  const open = useAppStore((s) => s.openEntity);
  const [prog, setProg] = useState('all');
  const [out, setOut] = useState('all');

  const items = useMemo(() => {
    let xs = launches.map((l) => ({ ...l, program: programOf(l) }));
    if (prog !== 'all') xs = xs.filter((l) => l.program === prog);
    if (out === 'past') xs = xs.filter((l) => l.outcome !== 'upcoming');
    else if (out === 'upcoming') xs = xs.filter((l) => l.outcome === 'upcoming');
    return xs.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }, [prog, out]);

  // group by year
  const byYear = useMemo(() => {
    const m = {};
    items.forEach((l) => { const y = String(l.date).slice(0, 4); (m[y] ||= []).push(l); });
    return Object.entries(m).sort((a, b) => b[0].localeCompare(a[0]));
  }, [items]);

  return (
    <>
      <SectionHeader emoji="🚀" title="Lancements — passés & à venir"
        subtitle="Manifeste européen : Ariane 6, Vega-C, microlanceurs · Galileo, Copernicus, IRIS², défense" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard label="Lancements 24-26" value={launchStats.total} sub="référencés (hors à venir)" icon={Rocket} tone="blue" />
        <StatCard label="Succès" value={launchStats.success} sub={`${Math.round(launchStats.success / launchStats.total * 100)}%`} icon={CheckCircle2} tone="green" />
        <StatCard label="Échecs/partiels" value={launchStats.failure + launchStats.partial} sub="Spectrum F1, VA262" icon={AlertTriangle} tone="amber" />
        <StatCard label="À venir" value={launchStats.upcoming} sub="manifeste" icon={Clock} tone="indigo" />
      </div>

      {/* Filters */}
      <div className="panel p-3 mb-4 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-slate-500 font-bold">Programme</span>
          <Pill active={prog === 'all'} onClick={() => setProg('all')}>Tous</Pill>
          {Object.keys(PROGRAMS).map((p) => <Pill key={p} active={prog === p} onClick={() => setProg(p)}>{p}</Pill>)}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-slate-500 font-bold">Période</span>
          <Pill active={out === 'all'} onClick={() => setOut('all')}>Tout</Pill>
          <Pill active={out === 'past'} onClick={() => setOut('past')}>Passés</Pill>
          <Pill active={out === 'upcoming'} tone="amber" onClick={() => setOut('upcoming')}>À venir</Pill>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-4">
        <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-slate-800" />
        {byYear.map(([year, ls]) => (
          <div key={year} className="mb-2">
            <div className="flex items-center gap-2 mb-2 -ml-4">
              <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-slate-950 z-10" />
              <span className="text-sm font-extrabold text-white tabular">{year}</span>
              <span className="text-[10px] text-slate-600">{ls.length} vol{ls.length > 1 ? 's' : ''}</span>
            </div>
            <div className="space-y-2 ml-3">
              {ls.map((l) => {
                const o = OUT[l.outcome]; const OIcon = o.icon; const pc = PROGRAMS[l.program];
                return (
                  <div key={l.id} className={`panel p-3 relative ${l.outcome === 'upcoming' ? 'border-dashed border-blue-500/40' : ''}`}>
                    <div className="absolute -left-[26px] top-4 w-2.5 h-2.5 rounded-full border-2 border-slate-950" style={{ background: pc }} />
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] text-slate-500 tabular">{l.date}</span>
                          <span className="text-sm font-bold text-white">{l.flight}</span>
                          <button onClick={() => launcherById[l.launcher] && open('launcher', l.launcher)} className="text-xs font-semibold text-blue-300 hover:text-blue-200">{l.launcherName} ↗</button>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: pc + '22', color: pc }}>{l.program}</span>
                        </div>
                        <div className="text-xs text-slate-300 mt-1">{l.payload}</div>
                        {l.note && <div className="text-[11px] text-slate-500 mt-0.5">{l.note}</div>}
                        <div className="text-[10px] text-slate-600 mt-1">📍 {l.site} · {l.operator}</div>
                      </div>
                      <Badge tone={o.tone}><OIcon size={11} />{o.label}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

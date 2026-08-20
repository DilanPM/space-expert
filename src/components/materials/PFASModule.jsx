import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Table2, PieChart, ListFilter, Scale, Droplets, AlertTriangle, ArrowRight, Search } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  pfasFamilies, pfasFamilyById, pfasFunctions, pfasFunctionById, pfasComponents,
  pfasByFamily, pfasByFunction, pfasRestriction,
} from '../../data/index.js';
import { SectionHeader, Badge, Pill, Confidence, StatCard } from '../common/ui.jsx';
import DataTable from '../common/DataTable.jsx';

const tip = { contentStyle: { background: '#0f172a', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }, cursor: { fill: '#1e293b55' } };
const FAM_COLOR = { ptfe: '#60a5fa', pvdf: '#a78bfa', etfe: '#34d399', fep: '#fbbf24', pfa: '#f472b6', ectfe: '#22d3ee', pfpe: '#fb923c', fkm: '#ef4444', ffkm: '#e879f9', fluorosilicone: '#2dd4bf', laminate: '#818cf8', coating: '#94a3b8', 'pfos-pfoa': '#dc2626', solvent: '#38bdf8', 'other-fluoro': '#475569' };
const FUNC_COLOR = { wire: '#60a5fa', seal: '#ef4444', lubrication: '#fb923c', thermal: '#fbbf24', rf: '#818cf8', coating: '#94a3b8', solvent: '#38bdf8', additive: '#dc2626', other: '#475569' };
const SUB_TONE = { difficile: 'red', moyenne: 'amber', possible: 'green', variable: 'slate' };

// ── Familles ──────────────────────────────────────────────────────────────────
function FamiliesTab() {
  const columns = [
    { key: 'abbr', label: 'Famille', width: 150, render: (f) => (
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: FAM_COLOR[f.id] }} /><span className="font-semibold text-white">{f.abbr && f.abbr !== '—' ? f.abbr : f.name}</span></span>) },
    { key: 'chemClass', label: 'Classe chimique', width: 170, render: (f) => <span className="text-slate-400">{f.chemClass}</span> },
    { key: 'functions', label: 'Fonction(s) spatiale(s)', sortable: false, render: (f) => <span className="text-slate-300">{f.functions.map((id) => pfasFunctionById[id]?.label).filter(Boolean).join(' · ')}</span> },
    { key: 'examples', label: 'Exemples / noms commerciaux', render: (f) => <span className="text-slate-400 text-[11px]">{f.examples}</span> },
    { key: 'reachStatus', label: 'Statut REACH', width: 150, render: (f) => /déjà restreint/i.test(f.reachStatus) ? <Badge tone="red">POP — restreint</Badge> : <Badge tone="amber">Restriction proposée</Badge> },
    { key: 'substitutability', label: 'Substituabilité', width: 120, value: (f) => ({ difficile: 3, moyenne: 2, possible: 1 }[f.substitutability] || 0), render: (f) => <Badge tone={SUB_TONE[f.substitutability]}>{f.substitutability}</Badge> },
    { key: 'count', label: 'Occur.', width: 70, align: 'right', render: (f) => <span className="tabular text-slate-200 font-bold">{f.count}</span> },
    { key: 'confidence', label: 'Source', width: 95, sortable: false, render: (f) => <Confidence level={f.confidence} /> },
  ];
  return (
    <>
      <div className="panel p-2.5 mb-3 flex items-center gap-2 flex-wrap">
        <Badge tone="green">✓ familles chimiques vérifiées</Badge>
        <span className="text-[11px] text-slate-400">Le rattachement fonctionnel (colonne « occurrences ») est dérivé par heuristique de ta liste de composants.</span>
      </div>
      <DataTable rows={pfasFamilies} columns={columns} getKey={(f) => f.id} initialSort={{ key: 'count', dir: 'desc' }} />
    </>
  );
}

// ── Analyses ──────────────────────────────────────────────────────────────────
function AnalysesTab() {
  const exposure = useMemo(() => {
    const acc = { difficile: 0, moyenne: 0, possible: 0, variable: 0 };
    pfasByFunction.forEach((f) => { acc[f.substituteRisk] = (acc[f.substituteRisk] || 0) + f.count; });
    return acc;
  }, []);
  const total = pfasComponents.length;
  const hardPct = Math.round((exposure.difficile / total) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Composants inventoriés" value={total} sub="entrées nettoyées" icon={Droplets} tone="blue" />
        <StatCard label="Familles PFAS" value={pfasByFamily.length} sub="fluoropolymères & fluides" icon={PieChart} tone="indigo" />
        <StatCard label="Dans le champ REACH" value={`${pfasFamilies.filter((f) => !/déjà restreint/i.test(f.reachStatus)).length}/${pfasFamilies.length}`} sub="restriction universelle" icon={Scale} tone="amber" />
        <StatCard label="Substitution difficile" value={`≈${hardPct}%`} sub="des composants" icon={AlertTriangle} tone="red" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="panel p-4">
          <h3 className="font-bold text-white text-sm mb-2">Composants par fonction</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pfasByFunction} layout="vertical" margin={{ left: 10, right: 30 }}>
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis type="category" dataKey="name" width={130} tick={{ fill: '#cbd5e1', fontSize: 10 }} />
              <Tooltip {...tip} formatter={(v) => [`${v} composants`, '']} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {pfasByFunction.map((d) => <Cell key={d.id} fill={FUNC_COLOR[d.id]} />)}
                <LabelList dataKey="count" position="right" fill="#cbd5e1" fontSize={10} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel p-4">
          <h3 className="font-bold text-white text-sm mb-2">Composants par famille chimique</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pfasByFamily} margin={{ left: -10, bottom: 30 }}>
              <XAxis dataKey="id" tick={{ fill: '#94a3b8', fontSize: 9 }} interval={0} angle={-30} textAnchor="end" height={50} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip {...tip} formatter={(v, n, p) => [`${v} composants`, p.payload.full]} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {pfasByFamily.map((d) => <Cell key={d.id} fill={FAM_COLOR[d.id]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-white text-sm flex items-center gap-2"><AlertTriangle size={15} className="text-red-400" />Exposition à la restriction — difficulté de substitution</h3>
          <Confidence level="internalDB" />
        </div>
        <div className="flex h-4 rounded-full overflow-hidden mb-3">
          {['difficile', 'moyenne', 'possible'].map((k) => exposure[k] > 0 && (
            <div key={k} style={{ width: `${(exposure[k] / total) * 100}%`, background: { difficile: '#ef4444', moyenne: '#fbbf24', possible: '#34d399' }[k] }} title={`${k}: ${exposure[k]}`} />
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {pfasFunctions.filter((f) => pfasByFunction.find((x) => x.id === f.id)).sort((a, b) => ({ difficile: 3, moyenne: 2, possible: 1, variable: 0 }[b.substituteRisk] - { difficile: 3, moyenne: 2, possible: 1, variable: 0 }[a.substituteRisk])).map((f) => {
            const cnt = pfasByFunction.find((x) => x.id === f.id)?.count || 0;
            return (
              <div key={f.id} className="panel-raised p-2.5 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: FUNC_COLOR[f.id] }} />
                <div className="flex-1 min-w-0"><div className="text-xs font-bold text-white truncate">{f.label}</div><div className="text-[10px] text-slate-500">{cnt} composants</div></div>
                <Badge tone={SUB_TONE[f.substituteRisk]}>{f.substituteRisk}</Badge>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500 mt-3">Les fonctions « difficiles » (lubrification PFPE, isolation câbles, joints, thermique) n'ont pas de substitut qualifié à court terme → cœur de la demande de dérogations aérospatiales.</p>
      </div>
    </div>
  );
}

// ── Inventaire ────────────────────────────────────────────────────────────────
function InventoryTab() {
  const [fam, setFam] = useState('all');
  const [fn, setFn] = useState('all');
  const [q, setQ] = useState('');
  const rows = useMemo(() => pfasComponents.filter((c) =>
    (fam === 'all' || c.family === fam) && (fn === 'all' || c.function === fn) &&
    (!q || c.raw.toLowerCase().includes(q.toLowerCase()))), [fam, fn, q]);

  const columns = [
    { key: 'raw', label: 'Composant', render: (c) => <span className="text-slate-200">{c.raw}</span> },
    { key: 'family', label: 'Famille', width: 130, render: (c) => <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: FAM_COLOR[c.family] }} /><span className="text-slate-300">{pfasFamilyById[c.family]?.abbr && pfasFamilyById[c.family].abbr !== '—' ? pfasFamilyById[c.family].abbr : pfasFamilyById[c.family]?.name}</span></span> },
    { key: 'function', label: 'Fonction', width: 150, render: (c) => <Badge tone="slate">{pfasFunctionById[c.function]?.label}</Badge> },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5">
          <Search size={13} className="text-slate-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtrer les composants…" className="bg-transparent text-xs text-slate-200 placeholder-slate-600 focus:outline-none w-44" />
        </div>
        <span className="text-[11px] text-slate-500">{rows.length} / {pfasComponents.length}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        <Pill active={fam === 'all'} onClick={() => setFam('all')}>Toutes familles</Pill>
        {pfasByFamily.map((f) => <Pill key={f.id} active={fam === f.id} onClick={() => setFam(f.id)}>{f.name} ({f.count})</Pill>)}
      </div>
      <div className="flex flex-wrap gap-1">
        <Pill active={fn === 'all'} onClick={() => setFn('all')} tone="amber">Toutes fonctions</Pill>
        {pfasByFunction.map((f) => <Pill key={f.id} active={fn === f.id} onClick={() => setFn(f.id)} tone="amber">{f.name} ({f.count})</Pill>)}
      </div>
      <DataTable rows={rows} columns={columns} getKey={(c) => c.id} initialSort={{ key: 'family', dir: 'asc' }} />
    </div>
  );
}

// ── Réglementation ────────────────────────────────────────────────────────────
function RegulationTab() {
  const setViewMode = useAppStore((s) => s.setViewMode);
  const r = pfasRestriction;
  return (
    <div className="space-y-4">
      <div className="panel p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-white text-sm flex items-center gap-2"><Scale size={15} className="text-blue-400" />{r.title}</h3>
          <Confidence level={r.confidence} sources={r.refs} />
        </div>
        <div className="relative pl-5 border-l-2 border-slate-800 space-y-3">
          {r.timeline.map((t, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[27px] top-0.5 w-3 h-3 rounded-full border-2 border-slate-950" style={{ background: { red: '#ef4444', amber: '#fbbf24', slate: '#64748b' }[t.tone] || '#3b82f6' }} />
              <div className="flex items-center gap-2 flex-wrap">
                <Badge tone={t.tone === 'red' ? 'red' : t.tone === 'amber' ? 'amber' : 'blue'}>{t.date}</Badge>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">{t.event}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="panel p-3 border-l-2 border-amber-500/40">
          <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-1">Arbitrage RAC vs SEAC</div>
          <p className="text-xs text-slate-300 leading-relaxed">{r.tension}</p>
        </div>
        <div className="panel p-3 border-l-2 border-blue-500/40">
          <div className="text-[11px] uppercase tracking-wider text-blue-400 font-bold mb-1">Dérogations</div>
          <p className="text-xs text-slate-300 leading-relaxed">{r.derogations}</p>
        </div>
      </div>

      <div className="panel p-4 border-l-2 border-red-500/50">
        <div className="font-bold text-white text-sm flex items-center gap-2 mb-1.5"><AlertTriangle size={15} className="text-red-400" />Enjeu pour l'autonomie spatiale européenne</div>
        <p className="text-xs text-slate-300 leading-relaxed">{r.spaceImpact}</p>
        <p className="text-[11px] text-slate-500 leading-relaxed mt-2">{r.legacy}</p>
      </div>

      <button onClick={() => setViewMode('policy')} className="panel p-3 w-full flex items-center justify-between hover:border-slate-600 transition-all">
        <span className="text-xs text-slate-300 flex items-center gap-2"><Scale size={14} className="text-blue-400" />Voir le module Politique, Droit & Budget (EU Space Act · REACH · autonomie)</span>
        <ArrowRight size={15} className="text-slate-500" />
      </button>
    </div>
  );
}

const TABS = [['families', 'Familles', Table2], ['analyses', 'Analyses', PieChart], ['inventory', 'Inventaire', ListFilter], ['regulation', 'Réglementation', Scale]];

export default function PFASModule() {
  const [tab, setTab] = useState('families');
  return (
    <>
      <SectionHeader emoji="🧴" title="REACH / PFAS — composants fluorés du spatial"
        subtitle={`${pfasComponents.length} composants · ${pfasByFamily.length} familles de fluoropolymères · restriction universelle REACH & enjeux de substitution`}
        right={<div className="flex flex-wrap gap-1">{TABS.map(([k, l, Icon]) => <Pill key={k} active={tab === k} onClick={() => setTab(k)}><Icon size={12} className="inline mr-1" />{l}</Pill>)}</div>} />
      {tab === 'families' && <FamiliesTab />}
      {tab === 'analyses' && <AnalysesTab />}
      {tab === 'inventory' && <InventoryTab />}
      {tab === 'regulation' && <RegulationTab />}
    </>
  );
}

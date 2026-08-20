import React, { useState, useMemo } from 'react';
import { Satellite, Trash2, DollarSign, Layers, Orbit, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { satPopulation, byOrbit, byOperator, byType, debrisStats, euConstellations, spaceStats, launcherClass } from '../../data/index.js';
import { SectionHeader, Badge, Pill, Confidence, StatCard } from '../common/ui.jsx';

const CLASSES = ['MICRO / LIGHT LIFT', 'LIGHT / SMALL LIFT', 'MEDIUM LIFT', 'HEAVY LIFT', 'SUPER HEAVY LIFT'];
const CLASS_SHORT = ['Micro/Light', 'Light/Small', 'Medium', 'Heavy', 'Super-heavy'];
const CLASS_COLOR = ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#ef4444'];
const tip = { contentStyle: { background: '#0f172a', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }, cursor: { fill: '#1e293b55' } };

function parseNum(v) {
  if (v == null) return null;
  const nums = String(v).replace(/,/g, '').match(/\d+(?:\.\d+)?/g);
  if (!nums) return null;
  const arr = nums.map(Number);
  return arr.length > 1 ? (arr[0] + arr[1]) / 2 : arr[0];
}

function costData(statName) {
  return spaceStats.filter((s) => s.stat === statName && s.label && parseNum(s.value) != null)
    .map((s) => ({ name: s.label, value: parseNum(s.value), raw: `${s.value} ${s.unit || ''}` }));
}

// ── Satellites tab ──────────────────────────────────────────────────────────
function SatellitesTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Satellites actifs" value="≈14 500" sub="début 2026" icon={Satellite} tone="blue" />
        <StatCard label="En orbite basse" value="≈88 %" sub="LEO (méga-constellations)" icon={Orbit} tone="green" />
        <StatCard label="Starlink" value="≈10 400" sub="≈69 % du total" icon={TrendingUp} tone="amber" />
        <StatCard label="Débris > 10 cm" value="≈36 000" sub="suivis (ESA DISCOS)" icon={Trash2} tone="red" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="panel p-4">
          <div className="flex items-center justify-between mb-2"><h3 className="font-bold text-white text-sm">Répartition par orbite</h3><Confidence level="verified" sources={['ESA', 'Orbital Radar']} /></div>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={byOrbit} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius={50} outerRadius={88} paddingAngle={2}>
                {byOrbit.map((d) => <Cell key={d.key} fill={d.color} stroke="#0f172a" />)}
              </Pie>
              <Tooltip {...tip} formatter={(v, n, p) => [`${v.toLocaleString('fr-FR')} sat.`, p.payload.label]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-1">
            {byOrbit.map((d) => <div key={d.key} className="flex items-center gap-1.5 text-[11px]"><span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /><b className="text-slate-200">{d.key}</b><span className="text-slate-500 truncate">{d.note}</span></div>)}
          </div>
        </div>

        <div className="panel p-4">
          <div className="flex items-center justify-between mb-2"><h3 className="font-bold text-white text-sm">Par opérateur / constellation</h3><Confidence level="verified" sources={['Orbital Radar 2026']} /></div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={byOperator} layout="vertical" margin={{ left: 10, right: 30 }}>
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis type="category" dataKey="key" width={120} tick={{ fill: '#cbd5e1', fontSize: 10 }} />
              <Tooltip {...tip} formatter={(v) => [`${v.toLocaleString('fr-FR')} sat.`, '']} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>{byOperator.map((d, i) => <Cell key={i} fill={d.color} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel p-4">
          <h3 className="font-bold text-white text-sm mb-2">Par type d'application</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byType} margin={{ left: -10 }}>
              <XAxis dataKey="key" tick={{ fill: '#94a3b8', fontSize: 9 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip {...tip} formatter={(v) => [`${v.toLocaleString('fr-FR')} sat.`, '']} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>{byType.map((d, i) => <Cell key={i} fill={d.color} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel p-4">
          <div className="flex items-center justify-between mb-2"><h3 className="font-bold text-white text-sm flex items-center gap-1.5"><Trash2 size={14} className="text-red-400" />Débris spatiaux</h3><Confidence level={debrisStats.confidence} sources={debrisStats.sources} /></div>
          <div className="space-y-2">
            {debrisStats.tiers.map((t) => (
              <div key={t.size} className="flex items-center justify-between panel p-2.5">
                <div><div className="text-sm font-bold text-white">{t.size}</div><div className="text-[10px] text-slate-500">{t.note}</div></div>
                <div className="text-lg font-extrabold text-red-300 tabular">{t.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EU constellations */}
      <div className="panel overflow-hidden">
        <div className="p-3 border-b border-slate-800 flex items-center justify-between"><h3 className="font-bold text-white text-sm">Constellations institutionnelles européennes</h3><Badge tone="gold">UE / ESA</Badge></div>
        <table className="w-full text-xs">
          <thead><tr className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
            {['Système', 'Orbite', 'Satellites', 'Usage', 'Statut', ''].map((h) => <th key={h} className="px-3 py-2 text-left font-bold">{h}</th>)}
          </tr></thead>
          <tbody>
            {euConstellations.map((c, i) => (
              <tr key={c.name} className={`border-b border-slate-800/60 ${i % 2 ? 'bg-slate-900/30' : ''}`}>
                <td className="px-3 py-2 font-bold text-white">{c.name}</td>
                <td className="px-3 py-2 text-slate-400">{c.orbit}</td>
                <td className="px-3 py-2 text-slate-300 tabular">{c.count}</td>
                <td className="px-3 py-2 text-slate-400">{c.use}</td>
                <td className="px-3 py-2"><Badge tone={/oper/i.test(c.status) ? 'green' : 'amber'}>{c.status}</Badge></td>
                <td className="px-3 py-2"><Confidence level={c.confidence} sources={c.sources} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-3 py-2 text-[11px] text-slate-500">{euConstellations.find((c) => c.name === 'IRIS²')?.note}</div>
      </div>
    </div>
  );
}

// ── Costs tab ───────────────────────────────────────────────────────────────
function CostsTab() {
  const perKg = costData('Cost to launch (per payload mass)');
  const perLaunch = costData('Cost of a launch');
  const sats = spaceStats.filter((s) => s.stat === 'Cost of a satellite');
  return (
    <div className="space-y-4">
      <div className="panel p-2.5 flex items-center gap-2"><Badge tone="slate">~ DB interne</Badge><span className="text-[11px] text-slate-400">Chiffres issus de ta DB Excel (ordres de grandeur, à actualiser).</span></div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="panel p-4">
          <h3 className="font-bold text-white text-sm mb-2">Coût de lancement par kg ($/kg)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={perKg} margin={{ left: 10 }}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip {...tip} formatter={(v, n, p) => [p.payload.raw, '']} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#60a5fa"><LabelList dataKey="value" position="top" fill="#cbd5e1" fontSize={10} /></Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="panel p-4">
          <h3 className="font-bold text-white text-sm mb-2">Coût d'un lancement (M$)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={perLaunch} margin={{ left: 10 }}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip {...tip} formatter={(v, n, p) => [p.payload.raw, '']} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#fbbf24"><LabelList dataKey="value" position="top" fill="#cbd5e1" fontSize={10} /></Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {sats.map((s, i) => (
          <div key={i} className="panel p-3"><div className="text-sm font-bold text-white">{s.label}</div><div className="text-lg font-extrabold text-green-300 tabular mt-0.5">{s.value} $</div><div className="text-[10px] text-slate-500">coût d'un satellite</div></div>
        ))}
      </div>
    </div>
  );
}

// ── Launcher classes tab ────────────────────────────────────────────────────
function ClassesTab() {
  const groups = useMemo(() => {
    const out = []; let cur = null;
    for (const r of launcherClass) {
      if (r.Category) { cur = { cat: r.Category, rows: [] }; out.push(cur); }
      if (cur && (r['Sub-category'] || r['MICRO / LIGHT LIFT'])) cur.rows.push(r);
    }
    return out;
  }, []);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {CLASS_SHORT.map((c, i) => <div key={c} className="panel p-2.5 text-center" style={{ borderColor: CLASS_COLOR[i] + '55' }}><div className="text-sm font-bold" style={{ color: CLASS_COLOR[i] }}>{c}</div></div>)}
      </div>
      <div className="panel overflow-auto max-h-[70vh]">
        <table className="w-full text-[11px] border-collapse">
          <thead className="sticky top-0 z-10"><tr className="bg-slate-900/95 backdrop-blur border-b border-slate-700">
            <th className="px-2.5 py-2 text-left font-bold text-slate-400 text-[10px] uppercase tracking-wider sticky left-0 bg-slate-900 min-w-[140px]">Critère</th>
            {CLASS_SHORT.map((c, i) => <th key={c} className="px-2.5 py-2 text-left font-bold text-[10px] uppercase tracking-wider min-w-[150px]" style={{ color: CLASS_COLOR[i] }}>{c}</th>)}
          </tr></thead>
          <tbody>
            {groups.map((g) => (
              <React.Fragment key={g.cat}>
                <tr className="bg-slate-800/60"><td colSpan={6} className="px-2.5 py-1.5 font-bold text-amber-300 text-[11px] uppercase tracking-wide">{g.cat}</td></tr>
                {g.rows.map((r, ri) => (
                  <tr key={ri} className={`border-b border-slate-800/50 ${ri % 2 ? 'bg-slate-900/30' : ''} align-top`}>
                    <td className="px-2.5 py-1.5 text-slate-400 font-medium sticky left-0 bg-slate-950">{r['Sub-category'] || '—'}</td>
                    {CLASSES.map((cl, ci) => <td key={cl} className="px-2.5 py-1.5 text-slate-300" style={{ borderLeft: `2px solid ${CLASS_COLOR[ci]}22` }}>{r[cl] || ''}</td>)}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TABS = [['satellites', 'Satellites & débris', Satellite], ['costs', 'Coûts', DollarSign], ['classes', 'Classes de lanceurs', Layers]];

export default function StatsModule() {
  const [tab, setTab] = useState('satellites');
  return (
    <>
      <SectionHeader emoji="📊" title="Statistiques spatiales"
        subtitle="Population de satellites, orbites, débris, coûts & classes de lanceurs — données vérifiées + DB interne"
        right={<div className="flex gap-1">{TABS.map(([k, l, Icon]) => <Pill key={k} active={tab === k} onClick={() => setTab(k)}><Icon size={12} className="inline mr-1" />{l}</Pill>)}</div>} />
      {tab === 'satellites' && <SatellitesTab />}
      {tab === 'costs' && <CostsTab />}
      {tab === 'classes' && <ClassesTab />}
    </>
  );
}

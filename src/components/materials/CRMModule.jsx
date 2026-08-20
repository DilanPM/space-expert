import React, { useState, useMemo } from 'react';
import { Marker } from 'react-simple-maps';
import { Map, Table2, GitBranchPlus, Lightbulb, AlertTriangle, Boxes, Recycle, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  crmMaterials, crmById, crmaBenchmarks, crmStages, crmInsights, crmCapability,
  crmCountryDominance, crmMaxScore, CRM_COUNTRY, BLOC_LABEL,
} from '../../data/index.js';
import { SectionHeader, Badge, Pill, Confidence } from '../common/ui.jsx';
import FlagIcon from '../common/FlagIcon.jsx';
import DataTable from '../common/DataTable.jsx';
import WorldMap from '../maps/WorldMap.jsx';

const RISK = { critical: { tone: 'red', label: 'Critique' }, high: { tone: 'amber', label: 'Élevé' }, medium: { tone: 'slate', label: 'Modéré' } };
const BLOC_TONE = { competitor: 'red', ally: 'green', partner: 'amber', risk: 'red', eu: 'blue' };
const CAT_TONE = { Structure: 'blue', Propulsion: 'amber', 'Électronique-RF': 'indigo', Aimants: 'red', 'Optique-capteurs': 'green', Thermique: 'slate' };

const lerp = (a, b, t) => Math.round(a + (b - a) * t);
function colorForScore(score) {
  const t = Math.min(1, score / crmMaxScore);
  return `rgb(${lerp(251, 153, t)},${lerp(191, 27, t)},${lerp(36, 27, t)})`; // amber-400 → red-800
}

function CountryPanel({ geoName, onOpen }) {
  const c = crmCountryDominance[geoName];
  if (!c) return null;
  const mats = c.materials.map((id) => crmById[id]).filter(Boolean);
  return (
    <div className="panel p-3">
      <div className="flex items-center gap-2 mb-2">
        <FlagIcon code={c.iso2} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-sm">{c.name}</div>
          <Badge tone={BLOC_TONE[c.bloc]}>{BLOC_LABEL[c.bloc]}</Badge>
        </div>
        <div className="text-right"><div className="text-2xl font-bold tabular text-red-400">{mats.length}</div><div className="text-[10px] text-slate-500">matières concernées</div></div>
      </div>
      <div className="space-y-1.5">
        {mats.map((m) => (
          <button key={m.id} onClick={() => onOpen('crm', m.id)} className="w-full flex items-center gap-2 panel-raised px-2.5 py-1.5 text-left hover:border-slate-600">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0`} style={{ background: colorForScore(crmMaxScore) }} />
            <span className="flex-1 min-w-0 truncate text-xs text-white font-semibold">{m.name}</span>
            {m.dominantShare && <Badge tone="red">{m.dominantShare}%</Badge>}
            <Badge tone={RISK[m.riskLevel].tone}>{RISK[m.riskLevel].label}</Badge>
          </button>
        ))}
      </div>
    </div>
  );
}

function MapTab({ open }) {
  const [zoom, setZoom] = useState(1.3);
  const [center, setCenter] = useState([20, 25]);
  const [sel, setSel] = useState('China');
  const [tip, setTip] = useState(null);
  const ranked = useMemo(() => Object.values(crmCountryDominance).sort((a, b) => b.score - a.score), []);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 panel overflow-hidden relative" style={{ background: '#071525' }}>
        <WorldMap center={center} zoom={zoom} minZoom={1} maxZoom={8} height="60vh"
          onMoveEnd={({ coordinates, zoom }) => { setCenter(coordinates); setZoom(zoom); }}
          fillFor={(geo) => { const c = crmCountryDominance[geo.properties.name]; return c ? colorForScore(c.score) : null; }}
          countryFiche={(geo) => crmCountryDominance[geo.properties.name] || null}
          onCountryClick={(c) => setSel(c.geoName)}
          onCountryHover={(c, e) => setTip(c ? { label: `${c.name} · ${c.materials.length} matières`, x: e.clientX, y: e.clientY } : null)}>
          {ranked.slice(0, 8).map((c) => (
            <Marker key={c.geoName} coordinates={c.centroid}>
              <circle r={Math.min(9, 3 + c.materials.length) / zoom} fill="none" stroke="#fff" strokeOpacity={0.5}
                strokeWidth={1 / zoom} vectorEffect="non-scaling-stroke" style={{ cursor: 'pointer' }}
                onClick={() => setSel(c.geoName)} />
            </Marker>
          ))}
        </WorldMap>

        {/* Légende */}
        <div className="absolute bottom-2 left-2 panel-raised px-2.5 py-2 text-[10px] space-y-1.5">
          <div className="text-slate-400 font-bold uppercase tracking-wider">Intensité de dépendance</div>
          <div className="flex items-center gap-1">
            <span className="text-slate-500">faible</span>
            <div className="h-2 w-24 rounded" style={{ background: 'linear-gradient(90deg, rgb(251,191,36), rgb(202,109,31), rgb(153,27,27))' }} />
            <span className="text-slate-500">élevée</span>
          </div>
          <div className="text-slate-500">Score = présence aux stades × criticité</div>
        </div>
        {tip && <div className="fixed z-50 pointer-events-none panel-raised px-2.5 py-1.5 text-xs text-white shadow-xl" style={{ left: tip.x + 14, top: tip.y - 6 }}>{tip.label}</div>}
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        <CountryPanel geoName={sel} onOpen={open} />
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">Classement des sources</div>
          <div className="space-y-1">
            {ranked.map((c) => (
              <button key={c.geoName} onClick={() => setSel(c.geoName)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all ${sel === c.geoName ? 'bg-slate-800 border border-slate-600' : 'hover:bg-slate-900 border border-transparent'}`}>
                <FlagIcon code={c.iso2} size="sm" />
                <span className="flex-1 min-w-0 truncate text-xs text-slate-200">{c.name}</span>
                <span className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden"><span className="block h-full rounded-full" style={{ width: `${(c.score / crmMaxScore) * 100}%`, background: colorForScore(c.score) }} /></span>
                <span className="text-[10px] text-slate-500 tabular w-4 text-right">{c.materials.length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueChainTab() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
      {crmStages.map((st, i) => (
        <div key={st.id} className="panel p-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge tone={st.tone}>{i + 1}</Badge>
            <span className="font-bold text-white text-sm flex items-center gap-1.5">
              {st.id === 'recycled' ? <Recycle size={14} className="text-slate-400" /> : null}{st.label}
            </span>
          </div>
          <div className="space-y-1.5">
            {st.items.map((it, j) => (
              <div key={j} className="panel-raised px-2.5 py-1.5 flex items-start gap-2">
                {it.country && CRM_COUNTRY[it.country] && <FlagIcon code={CRM_COUNTRY[it.country].iso2} size="sm" className="mt-0.5" />}
                <div className="min-w-0">
                  {it.country && CRM_COUNTRY[it.country] && <div className="text-[11px] font-bold text-white">{CRM_COUNTRY[it.country].name}</div>}
                  <div className="text-[11px] text-slate-400 leading-snug">{it.what}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function InsightsTab({ open }) {
  const b = crmaBenchmarks;
  const tiles = [
    { v: `≥${b.extraction}%`, l: 'Extraction UE 2030', tone: 'text-blue-400' },
    { v: `≥${b.processing}%`, l: 'Transformation UE 2030', tone: 'text-indigo-400' },
    { v: `≥${b.recycling}%`, l: 'Recyclage UE 2030', tone: 'text-green-400' },
    { v: `≤${b.singleCountryCap}%`, l: 'depuis un seul pays tiers', tone: 'text-amber-400' },
  ];
  return (
    <div className="space-y-4">
      <div className="panel p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-white text-sm flex items-center gap-2"><Boxes size={15} className="text-blue-400" />Scorecard CRMA — objectifs 2030</div>
          <Confidence level={b.confidence} sources={b.refs} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tiles.map((t) => (
            <div key={t.l} className="panel-raised p-3 text-center"><div className={`text-3xl font-bold tabular ${t.tone}`}>{t.v}</div><div className="text-[11px] text-slate-500 mt-1">{t.l}</div></div>
          ))}
        </div>
        <div className="text-[11px] text-slate-500 mt-3">{b.reg} · {b.inForce} — {b.note}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {crmInsights.map((ins) => (
          <div key={ins.id} className="panel p-3">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                {ins.tone === 'red' ? <AlertTriangle size={14} className="text-red-400 flex-shrink-0" /> : <Lightbulb size={14} className="text-amber-400 flex-shrink-0" />}
                {ins.title}
              </div>
              <Confidence level={ins.confidence} sources={ins.refs} />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{ins.body}</p>
          </div>
        ))}
      </div>

      <div className="panel p-4">
        <div className="font-bold text-white text-sm mb-3 flex items-center gap-2"><ArrowRight size={15} className="text-indigo-400" />Matière → capacité spatiale</div>
        <div className="space-y-2">
          {crmCapability.map((cap) => (
            <div key={cap.capability} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="sm:w-72 flex-shrink-0"><Badge tone={cap.tone}>{cap.capability}</Badge></div>
              <div className="flex flex-wrap gap-1.5">
                {cap.materials.map((id) => crmById[id] && (
                  <button key={id} onClick={() => open('crm', id)} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-slate-700 bg-slate-800/60 text-[11px] text-slate-200 hover:border-slate-500">
                    {crmById[id].name}<span className="opacity-40">→</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CRMModule() {
  const open = useAppStore((s) => s.openEntity);
  const [tab, setTab] = useState('carte');

  const columns = [
    { key: 'name', label: 'Matière', width: 200, render: (m) => (
        <span className="flex items-center gap-1.5">
          {CRM_COUNTRY[m.dominantCountry] && <FlagIcon code={CRM_COUNTRY[m.dominantCountry].iso2} size="xs" />}
          <span className="font-semibold text-white">{m.name}</span>
          {m.symbol && m.symbol !== '—' && <span className="text-slate-600 text-[10px]">{m.symbol}</span>}
        </span>) },
    { key: 'category', label: 'Catégorie', width: 130, render: (m) => <Badge tone={CAT_TONE[m.category] || 'slate'}>{m.category}</Badge> },
    { key: 'satelliteUse', label: 'Rôle spatial', render: (m) => <span className="text-slate-300">{m.satelliteUse}</span> },
    { key: 'riskLevel', label: 'Risque', width: 90, value: (m) => ({ critical: 3, high: 2, medium: 1 }[m.riskLevel] || 0), render: (m) => <Badge tone={RISK[m.riskLevel].tone}>{RISK[m.riskLevel].label}</Badge> },
    { key: 'dominantCountry', label: 'Dépendance', width: 150, render: (m) => (
        <span className="flex items-center gap-1.5">
          {CRM_COUNTRY[m.dominantCountry] && <FlagIcon code={CRM_COUNTRY[m.dominantCountry].iso2} size="xs" />}
          <span className="text-slate-300">{CRM_COUNTRY[m.dominantCountry]?.name || m.dominantCountry}</span>
          {m.dominantShare && <Badge tone="red">{m.dominantShare}%</Badge>}
        </span>) },
    { key: 'crmaListed', label: 'CRMA', width: 70, align: 'center', value: (m) => (m.crmaListed ? 1 : 0), render: (m) => m.crmaListed ? <Badge tone="blue">✓</Badge> : <span className="text-slate-700">—</span> },
    { key: 'confidence', label: 'Source', width: 100, sortable: false, render: (m) => <Confidence level={m.confidence} sources={m.refs} /> },
  ];

  const TABS = [
    { id: 'carte', label: 'Carte & dépendances', icon: Map },
    { id: 'table', label: 'Tableau', icon: Table2 },
    { id: 'chain', label: 'Chaîne de valeur', icon: GitBranchPlus },
    { id: 'insights', label: 'Insights UE', icon: Lightbulb },
  ];

  return (
    <>
      <SectionHeader emoji="⛏️" title="CRM — Matières premières critiques"
        subtitle={`${crmMaterials.length} matériaux avancés · dépendances d'approvisionnement spatial/défense · cadre CRMA (autonomie stratégique UE)`}
        right={<div className="flex flex-wrap gap-1">{TABS.map((t) => <Pill key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</Pill>)}</div>} />

      {tab === 'carte' && <MapTab open={open} />}
      {tab === 'table' && <DataTable rows={crmMaterials} columns={columns} getKey={(m) => m.id} onRowClick={(m) => open('crm', m.id)} initialSort={{ key: 'riskLevel', dir: 'desc' }} />}
      {tab === 'chain' && <ValueChainTab />}
      {tab === 'insights' && <InsightsTab open={open} />}
    </>
  );
}

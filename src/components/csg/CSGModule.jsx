import React, { useState } from 'react';
import { Radar, ChevronDown, Rocket, MapPin, AlertTriangle, Factory, Satellite as SatIcon, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import { csgLaunchpads, narratives, launcherById } from '../../data/index.js';
import { csgFacilities, launcherPathway, satellitePathway } from '../../data/curated/csg.js';
import { SectionHeader, Badge, KeyVal, Pill, Confidence, statusTone } from '../common/ui.jsx';
import SpaceImage from '../common/SpaceImage.jsx';
import DataTable from '../common/DataTable.jsx';

const critTone = (c) => ({ critical: 'red', high: 'amber', medium: 'blue' }[c] || 'slate');
const critLabel = (c) => ({ critical: 'critique', high: 'élevée', medium: 'moyenne' }[c] || c);

// ── Schematic (real GPS) ────────────────────────────────────────────────────
function useProjector(pads) {
  const cs = pads.map((p) => p.coords).filter(Boolean);
  const lons = cs.map((c) => c[0]), lats = cs.map((c) => c[1]);
  const minLon = Math.min(...lons), maxLon = Math.max(...lons), minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const padX = (maxLon - minLon) * 0.2 || 0.02, padY = (maxLat - minLat) * 0.2 || 0.02;
  const x0 = minLon - padX, x1 = maxLon + padX, y0 = minLat - padY, y1 = maxLat + padY;
  return ([lon, lat]) => [((lon - x0) / (x1 - x0)) * 1000, (1 - (lat - y0) / (y1 - y0)) * 680];
}
function Schematic({ pads, onOpen }) {
  const project = useProjector(pads);
  const [hover, setHover] = useState(null);
  return (
    <div className="panel overflow-hidden relative grid-bg" style={{ background: 'linear-gradient(160deg,#06243b,#071326)' }}>
      <svg viewBox="0 0 1000 680" className="w-full" style={{ height: '60vh' }}>
        <text x={20} y={36} fill="#1e3a5f" fontSize="22" fontWeight="bold">OCÉAN ATLANTIQUE</text>
        <text x={740} y={655} fill="#14532d" fontSize="16" fontWeight="bold">GUYANE · Kourou</text>
        {pads.map((p) => {
          if (!p.coords) return null;
          const [x, y] = project(p.coords);
          const tone = statusTone(p.status);
          const col = { green: '#34d399', amber: '#fbbf24', red: '#94a3b8', slate: '#94a3b8', blue: '#60a5fa' }[tone];
          const active = /active|operational/i.test(p.status || '');
          return (
            <g key={p.id} transform={`translate(${x},${y})`} style={{ cursor: 'pointer' }} onClick={() => onOpen(p.id)} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)}>
              {active && <circle r={18} fill={col} opacity={0.18}><animate attributeName="r" values="14;24;14" dur="2.4s" repeatCount="indefinite" /></circle>}
              <circle r={hover === p.id ? 11 : 8} fill={col} stroke="#020617" strokeWidth={2} />
              <g transform="translate(16,-6)">
                <rect x={-2} y={-13} width={(p.code || p.name).length * 8 + 16 + (p.sub ? p.sub.length * 5.2 : 0)} height={22} rx={5} fill="#0b1f38" opacity={hover === p.id ? 1 : 0.82} stroke={col} strokeWidth={hover === p.id ? 1 : 0.5} />
                <text x={6} y={2} fill="#fff" fontSize="13" fontWeight="bold">{p.code || p.name.slice(0, 8)}<tspan fill={col} fontSize="11" fontWeight="500"> {p.sub}</tspan></text>
              </g>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-2 left-3 text-[10px] text-slate-500">Positions réelles (GPS) · cliquer un pas de tir → fiche</div>
    </div>
  );
}

// ── Pathway flow ────────────────────────────────────────────────────────────
function Pathway({ title, icon: Icon, steps, color }) {
  return (
    <div className="panel p-4">
      <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2"><Icon size={16} style={{ color }} />{title}</h3>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={s.n} className="flex gap-3">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: color + '22', color, border: `1px solid ${color}55` }}>{s.n}</div>
              {i < steps.length - 1 && <div className="w-0.5 flex-1 my-0.5" style={{ background: color + '33' }} />}
            </div>
            <div className="pb-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-white">{s.step}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{s.loc}</span>
                <Badge tone={critTone(s.crit)}>{s.crit === 'critical' && <AlertTriangle size={9} />}criticité {critLabel(s.crit)}</Badge>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [['vue', 'Vue & Ariane 6'], ['pads', 'Pas de tir'], ['infra', 'Infrastructures'], ['process', 'Cheminements'], ['dossier', 'Dossier']];

export default function CSGModule() {
  const open = useAppStore((s) => s.openEntity);
  const [tab, setTab] = useState('vue');
  const [showNarr, setShowNarr] = useState(true);
  const narr = narratives.launchFacilities || [];
  const a6 = launcherById['ariane-64'];

  const padCols = [
    { key: 'code', label: 'Code', width: 70, render: (p) => <span className="font-bold text-white">{p.code || '—'}</span> },
    { key: 'sub', label: 'Affectation', width: 110, render: (p) => <span className="text-amber-300">{p.sub || '—'}</span> },
    { key: 'name', label: 'Désignation', width: 220, render: (p) => <span className="text-slate-300">{p.name}</span> },
    { key: 'status', label: 'Statut', width: 100, render: (p) => <Badge tone={statusTone(p.status)}>{(p.status || '—').split('·')[0].slice(0, 14)}</Badge> },
    { key: 'tenant', label: 'Occupant', width: 110, render: (p) => p.tenant || '—' },
    { key: 'uses', label: 'Occupation / projets', render: (p) => <span className="text-slate-300">{(p.uses || []).slice(0, 4).join(' · ') || '—'}</span> },
    { key: 'notableLaunches', label: 'Historique', render: (p) => <span className="text-slate-500 text-[11px]">{(p.notableLaunches || []).join(', ').slice(0, 80) || '—'}</span> },
  ];

  const facCats = ['Lanceur', 'Satellites', 'Propulsion', 'Zone de lancement', 'Opérations', 'Logistique'];

  return (
    <>
      <SectionHeader emoji="🇬🇫" title="Centre Spatial Guyanais (CSG)"
        subtitle="Kourou · le port spatial de l'Europe — infrastructures, pas de tir, cheminements & criticité"
        right={<div className="flex gap-1 flex-wrap">{TABS.map(([k, l]) => <Pill key={k} active={tab === k} onClick={() => setTab(k)}>{l}</Pill>)}</div>} />

      {tab === 'vue' && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"><Schematic pads={csgLaunchpads} onOpen={(id) => open('pad', id)} /></div>
          <div className="space-y-3">
            <div className="panel overflow-hidden">
              <SpaceImage query="Ariane 6" alt="Ariane 6" contain className="h-40 border-b border-slate-800" />
              <div className="p-3">
                <div className="flex items-center justify-between"><div className="font-bold text-white">Ariane 6</div><Badge tone="green">Opérationnel</Badge></div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Lanceur lourd européen depuis <b className="text-amber-300">ELA-4</b>. Vulcain 2.1 (LOX/LH₂) + Vinci ré-allumable ; 2 ou 4 boosters P120C (UPG) communs avec Vega-C.</p>
                {a6 && <div className="panel p-2.5 mt-2"><KeyVal k="Charge LEO (A64)" v={`${a6.capLEO?.toLocaleString('fr-FR')} kg`} mono /><KeyVal k="Charge GTO (A64)" v={`${a6.capGTO?.toLocaleString('fr-FR')} kg`} mono /></div>}
                <div className="flex gap-1.5 mt-2">
                  <button onClick={() => open('launcher', 'ariane-62')} className="text-[11px] px-2 py-1 rounded-md bg-blue-600/20 text-blue-300 border border-blue-500/30">Fiche A62 →</button>
                  <button onClick={() => open('launcher', 'ariane-64')} className="text-[11px] px-2 py-1 rounded-md bg-blue-600/20 text-blue-300 border border-blue-500/30">Fiche A64 →</button>
                </div>
              </div>
            </div>
            <button onClick={() => open('spaceport', 'guiana-space-centre-csg')} className="panel p-3 w-full text-left hover:border-slate-600 flex items-center gap-2"><MapPin size={15} className="text-amber-400" /><span className="text-sm text-slate-200 font-semibold">Fiche complète du CSG</span><span className="ml-auto text-slate-500">→</span></button>
          </div>
        </div>
      )}

      {tab === 'pads' && (
        <DataTable rows={csgLaunchpads} columns={padCols} getKey={(p) => p.id} onRowClick={(p) => open('pad', p.id)} initialSort={{ key: 'status', dir: 'asc' }} />
      )}

      {tab === 'infra' && (
        <div className="space-y-4">
          <div className="panel p-2.5 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-slate-400 font-bold">Criticité :</span>
            <Badge tone="red"><AlertTriangle size={9} />critique</Badge><Badge tone="amber">élevée</Badge><Badge tone="blue">moyenne</Badge>
            <span className="text-[11px] text-slate-500">— points uniques (UPG, ELA-4, ergols liquides) = vulnérabilités stratégiques.</span>
          </div>
          {facCats.map((cat) => {
            const items = csgFacilities.filter((f) => f.cat === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">{cat}</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((f) => (
                    <div key={f.id} className="panel p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-white text-sm">{f.name}</span>
                        <Badge tone={critTone(f.crit)}>{f.crit === 'critical' && <AlertTriangle size={9} />}{critLabel(f.crit)}</Badge>
                      </div>
                      <div className="text-[10px] text-slate-500 mb-1">{f.full} · {f.zone}</div>
                      <div className="text-[11px] text-slate-300 leading-snug">{f.role}</div>
                      <div className="mt-1.5"><Confidence level={f.confidence} sources={f.sources} /></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'process' && (
        <div className="space-y-4">
          <div className="panel p-3 grid-bg">
            <p className="text-sm text-slate-300 leading-relaxed">Deux flux convergent vers le pas de tir : le <b className="text-blue-300">lanceur</b> (assemblage BAL → érection ELA-4 → boosters UPG) et la <b className="text-green-300">charge utile</b> (EPCU S1 → remplissage S3/S5 → encapsulation). Le mâtage charge utile + lanceur précède la chronologie de tir. Les étapes <b className="text-red-300">critiques</b> reposent souvent sur des points uniques (UPG, ELA-4).</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <Pathway title="Cheminement du lanceur (Ariane 6)" icon={Rocket} steps={launcherPathway} color="#60a5fa" />
            <Pathway title="Cheminement de la charge utile (satellite)" icon={SatIcon} steps={satellitePathway} color="#34d399" />
          </div>
          <div className="panel p-3 flex items-center gap-2 text-xs text-slate-400"><ArrowRight size={14} className="text-amber-400" /><b className="text-amber-300">Convergence :</b> mâtage charge utile sur lanceur en zone de lancement, puis chronologie synchronisée (salle Jupiter) → décollage.</div>
        </div>
      )}

      {tab === 'dossier' && (
        <div className="panel overflow-hidden">
          <button onClick={() => setShowNarr((o) => !o)} className="w-full flex items-center justify-between p-3 hover:bg-slate-900/50">
            <span className="font-bold text-white text-sm flex items-center gap-2"><Radar size={15} className="text-blue-400" />Dossier — Installations de lancement du CSG <Badge tone="slate">~ DB interne</Badge></span>
            <ChevronDown size={16} className={`text-slate-500 transition-transform ${showNarr ? 'rotate-180' : ''}`} />
          </button>
          {showNarr && (
            <div className="px-4 pb-4 space-y-2 border-t border-slate-800 pt-3 max-h-[64vh] overflow-y-auto">
              {narr.map((p, i) => <p key={i} className="text-xs text-slate-300 leading-relaxed">{p}</p>)}
            </div>
          )}
        </div>
      )}
    </>
  );
}

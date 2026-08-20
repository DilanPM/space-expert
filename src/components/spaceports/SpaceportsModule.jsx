import React, { useState } from 'react';
import { Marker } from 'react-simple-maps';
import { FlaskConical, Building, Rocket } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import { spaceports, testCentres, groundInfra, narratives } from '../../data/index.js';
import { SectionHeader, Badge, Pill, Confidence, statusTone } from '../common/ui.jsx';
import { ChevronDown } from 'lucide-react';
import FlagIcon from '../common/FlagIcon.jsx';
import DataTable from '../common/DataTable.jsx';
import WorldMap from '../maps/WorldMap.jsx';

function flagOf(country = '') {
  const t = country.toLowerCase();
  if (t.includes('guiana') || t.includes('france')) return 'fr';
  if (t.includes('sweden')) return 'se';
  if (t.includes('norway')) return 'no';
  if (t.includes('united kingdom') || t.includes('scotland') || t.includes('england')) return 'gb';
  if (t.includes('portugal') || t.includes('azores')) return 'pt';
  if (t.includes('germany')) return 'de';
  if (t.includes('spain')) return 'es';
  return 'eu';
}

export default function SpaceportsModule() {
  const open = useAppStore((s) => s.openEntity);
  const [hover, setHover] = useState(null);
  const [view, setView] = useState('cards');
  const [zoom, setZoom] = useState(3.6);
  const [dossier, setDossier] = useState(false);
  const testNarr = narratives.testCentres || [];

  const columns = [
    { key: 'name', label: 'Spaceport', width: 200, render: (s) => (
        <span className="flex items-center gap-1.5"><FlagIcon code={flagOf(s.country)} size="xs" /><span className="font-semibold text-white">{s.name.split('(')[0].trim()}</span></span>) },
    { key: 'country', label: 'Pays / territoire', width: 150, render: (s) => <span className="text-slate-400">{s.country}</span> },
    { key: 'launchType', label: 'Type', width: 90 },
    { key: 'status', label: 'Statut', width: 120, render: (s) => <Badge tone={statusTone(s.status2025 || s.status)}>{(s.status || '—').slice(0, 16)}</Badge> },
    { key: 'compatibility', label: 'Compatibilité', render: (s) => <span className="text-slate-300">{Array.isArray(s.compatibility) ? s.compatibility.join(' · ') : (s.compatibility || '—')}</span> },
    { key: 'confidence', label: 'Source', width: 100, render: (s) => <Confidence level={s.confidence} /> },
  ];

  return (
    <>
      <SectionHeader emoji="🌍" title="Spaceports & Infrastructures sol"
        subtitle={`${spaceports.length} ports spatiaux européens · ${testCentres.length} bancs d'essai · segment sol`}
        right={<div className="flex gap-1"><Pill active={view === 'cards'} onClick={() => setView('cards')}>Carte + fiches</Pill><Pill active={view === 'table'} onClick={() => setView('table')}>Tableau</Pill></div>} />

      {view === 'table' ? (
        <DataTable rows={spaceports} columns={columns} getKey={(s) => s.id} onRowClick={(s) => open('spaceport', s.id)} initialSort={{ key: 'name', dir: 'asc' }} />
      ) : (
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 panel overflow-hidden relative" style={{ background: '#071525' }}>
            <WorldMap center={[8, 52]} zoom={zoom} minZoom={1} maxZoom={40} height="56vh" onMoveEnd={({ zoom }) => setZoom(zoom)}>
              {spaceports.filter((s) => s.coords).map((s) => (
                <Marker key={s.id} coordinates={s.coords}>
                  <circle r={6 / zoom} fill="#fbbf24" stroke="#020617" strokeWidth={1.5 / zoom} vectorEffect="non-scaling-stroke" style={{ cursor: 'pointer' }}
                    onClick={() => open('spaceport', s.id)}
                    onMouseEnter={(e) => setHover({ name: `🚀 ${s.name}`, x: e.clientX, y: e.clientY })}
                    onMouseMove={(e) => setHover({ name: `🚀 ${s.name}`, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setHover(null)} />
                </Marker>
              ))}
              {testCentres.map((t) => (
                <Marker key={t.id} coordinates={t.coords}>
                  <circle r={4 / zoom} fill="#f472b6" stroke="#020617" strokeWidth={1 / zoom} vectorEffect="non-scaling-stroke" style={{ cursor: 'default' }}
                    onMouseEnter={(e) => setHover({ name: `🧪 ${t.name}`, x: e.clientX, y: e.clientY })}
                    onMouseMove={(e) => setHover({ name: `🧪 ${t.name}`, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setHover(null)} />
                </Marker>
              ))}
            </WorldMap>
            <div className="absolute top-2 left-2 panel-raised px-2.5 py-2 text-[10px] space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full bg-amber-400" />Spaceport</div>
              <div className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full bg-pink-400" />Banc d'essai</div>
            </div>
            {hover && <div className="fixed z-50 pointer-events-none panel-raised px-2.5 py-1.5 text-xs text-white shadow-xl" style={{ left: hover.x + 14, top: hover.y - 6 }}>{hover.name}</div>}
          </div>

          <div className="lg:col-span-2 space-y-2 max-h-[56vh] overflow-y-auto pr-1">
            {spaceports.map((s) => (
              <button key={s.id} onClick={() => open('spaceport', s.id)} className="panel p-3 w-full text-left hover:border-slate-600 transition-all">
                <div className="flex items-start gap-2">
                  <FlagIcon code={flagOf(s.country)} size="md" className="mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm truncate">{s.name.split('(')[0].trim()}</div>
                    <div className="text-[11px] text-slate-500">{s.location} · {s.country}</div>
                  </div>
                  <Badge tone={statusTone(s.status2025 || s.status)}>{(s.status || '').slice(0, 14)}</Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5"><Building size={13} />Types d'infrastructures sol</div>
          <div className="space-y-2">
            {groundInfra.map((g) => (
              <div key={g.id} className="panel p-3"><div className="font-bold text-white text-sm">{g.type}</div>{g.elements && <div className="text-xs text-slate-400 mt-1 leading-relaxed">{g.elements}</div>}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5"><FlaskConical size={13} />Bancs d'essai & centres de test</div>
          <div className="space-y-2">
            {testCentres.map((t) => (
              <div key={t.id} className="panel p-3">
                <div className="flex items-center justify-between"><div className="font-bold text-white text-sm">{t.name}</div><Badge tone="indigo">{t.country}</Badge></div>
                <div className="text-xs text-slate-400 mt-1 leading-relaxed">{t.role}</div>
                <div className="text-[10px] text-slate-600 mt-1">{t.operator}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dossier — centres de test (Excel narrative) */}
      {testNarr.length > 0 && (
        <div className="panel mt-4 overflow-hidden">
          <button onClick={() => setDossier((o) => !o)} className="w-full flex items-center justify-between p-3 hover:bg-slate-900/50">
            <span className="font-bold text-white text-sm flex items-center gap-2"><FlaskConical size={15} className="text-pink-400" />Dossier — Cartographie des centres de test critiques <Badge tone="slate">~ DB interne</Badge></span>
            <ChevronDown size={16} className={`text-slate-500 transition-transform ${dossier ? 'rotate-180' : ''}`} />
          </button>
          {dossier && (
            <div className="px-4 pb-4 space-y-2 border-t border-slate-800 pt-3 max-h-[64vh] overflow-y-auto">
              {testNarr.map((p, i) => <p key={i} className="text-xs text-slate-300 leading-relaxed">{p}</p>)}
            </div>
          )}
        </div>
      )}
    </>
  );
}

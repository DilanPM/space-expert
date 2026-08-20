import React, { useState } from 'react';
import { Marker } from 'react-simple-maps';
import { Rocket, FlaskConical, Building2, Factory, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import { spaceports, worldSpaceports, testCentres, institutions, companies, countryByMapName, countries } from '../../data/index.js';
import { SectionHeader } from '../common/ui.jsx';
import FlagIcon from '../common/FlagIcon.jsx';
import WorldMap from './WorldMap.jsx';

const LAYER_DEFS = [
  { key: 'spaceports', label: 'Spaceports', color: '#fbbf24', icon: Rocket },
  { key: 'testCentres', label: "Bancs d'essai", color: '#f472b6', icon: FlaskConical },
  { key: 'institutions', label: 'Institutions', color: '#60a5fa', icon: Building2 },
  { key: 'manufacturers', label: 'Industriels', color: '#34d399', icon: Factory },
];

function Dot({ coords, color, baseR = 4, zoom = 1, onClick, onHover, label }) {
  if (!coords) return null;
  return (
    <Marker coordinates={coords}>
      <circle r={baseR / zoom} fill={color} stroke="#020617" strokeWidth={1.2 / zoom}
        vectorEffect="non-scaling-stroke"
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        onClick={onClick}
        onMouseEnter={(e) => onHover?.({ label, x: e.clientX, y: e.clientY })}
        onMouseMove={(e) => onHover?.({ label, x: e.clientX, y: e.clientY })}
        onMouseLeave={() => onHover?.(null)} />
    </Marker>
  );
}

export default function StrategicMap() {
  const layers = useAppStore((s) => s.mapLayers);
  const toggle = useAppStore((s) => s.toggleLayer);
  const open = useAppStore((s) => s.openEntity);
  const [tip, setTip] = useState(null);
  const [pos, setPos] = useState([15, 30]);
  const [zoom, setZoom] = useState(1.4);

  const counts = {
    spaceports: spaceports.filter((s) => s.coords).length + worldSpaceports.length,
    testCentres: testCentres.length,
    institutions: institutions.length + institutions.reduce((n, i) => n + (i.centres?.length || 0), 0),
    manufacturers: companies.filter((c) => c.hq?.coords).length,
  };

  return (
    <>
      <SectionHeader emoji="🗺️" title="Carte stratégique" subtitle="Sites de lancement · bancs d'essai · sièges institutions · industriels — calques superposables · clic pays = fiche" />

      <div className="flex flex-wrap gap-2 mb-3">
        {LAYER_DEFS.map(({ key, label, color, icon: Icon }) => (
          <button key={key} onClick={() => toggle(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              layers[key] ? 'border-slate-600 bg-slate-800 text-white' : 'border-slate-800 bg-slate-950 text-slate-600'}`}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: layers[key] ? color : '#334155' }} />
            <Icon size={13} />{label}<span className="text-slate-500">{counts[key]}</span>
            {layers[key] ? <Eye size={12} className="text-slate-500" /> : <EyeOff size={12} />}
          </button>
        ))}
        <div className="flex gap-1 ml-auto">
          <button onClick={() => { setPos([5, 20]); setZoom(2.2); }} className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700">🌍 Atlantique</button>
          <button onClick={() => { setPos([10, 50]); setZoom(4); }} className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700">🇪🇺 Europe</button>
          <button onClick={() => { setPos([-52.7, 5.2]); setZoom(60); }} className="px-2.5 py-1.5 rounded-lg text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40">🇬🇫 CSG</button>
          <button onClick={() => { setPos([15, 30]); setZoom(1.4); }} className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700">Reset</button>
        </div>
      </div>

      <div className="panel overflow-hidden grid-bg relative" style={{ background: '#071525' }}>
        <WorldMap center={pos} zoom={zoom} height="68vh"
          onMoveEnd={({ coordinates, zoom }) => { setPos(coordinates); setZoom(zoom); }}
          countryFiche={(geo) => countryByMapName[geo.properties.name] || null}
          onCountryClick={(f) => open('country', f.id)}
          onCountryHover={(f, e) => setTip(f ? { label: `🌍 ${f.name} — fiche pays`, x: e.clientX, y: e.clientY } : null)}>

          {layers.spaceports && spaceports.filter((s) => s.coords).map((s) => (
            <Dot key={s.id} coords={s.coords} color="#fbbf24" baseR={5} zoom={zoom} label={`🚀 ${s.name}`} onHover={setTip} onClick={() => open('spaceport', s.id)} />
          ))}
          {layers.spaceports && worldSpaceports.map((s) => (
            <Dot key={s.id} coords={s.coords} color="#b45309" baseR={4} zoom={zoom} label={`🚀 ${s.name} · ${s.country}`} onHover={setTip} />
          ))}
          {layers.testCentres && testCentres.map((t) => (
            <Dot key={t.id} coords={t.coords} color="#f472b6" baseR={4} zoom={zoom} label={`🧪 ${t.name}`} onHover={setTip} />
          ))}
          {layers.institutions && institutions.flatMap((i) => [
            i.hq?.coords && <Dot key={i.id} coords={i.hq.coords} color="#60a5fa" baseR={4.5} zoom={zoom} label={`🏛️ ${i.short} · ${i.hq.city}`} onHover={setTip} onClick={() => open('institution', i.id)} />,
            ...(i.centres || []).map((c, ci) => (
              <Dot key={`${i.id}-${ci}`} coords={c.coords} color="#3b82f6" baseR={3.5} zoom={zoom} label={`🏛️ ${i.short} ${c.name} · ${c.city}`} onHover={setTip} onClick={() => open('institution', i.id)} />
            )),
          ])}
          {layers.manufacturers && companies.filter((c) => c.hq?.coords).map((c) => (
            <Dot key={c.id} coords={c.hq.coords} color="#34d399" baseR={4} zoom={zoom} label={`🏭 ${c.name} · ${c.hq.city}`} onHover={setTip} onClick={() => open('company', c.id)} />
          ))}
        </WorldMap>

        {/* Legend */}
        <div className="absolute top-2 left-2 panel-raised px-2.5 py-2 text-[10px] space-y-1">
          {LAYER_DEFS.filter((l) => layers[l.key]).map((l) => (
            <div key={l.key} className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} />{l.label}</div>
          ))}
        </div>
        {tip && (
          <div className="fixed z-50 pointer-events-none panel-raised px-2.5 py-1.5 text-xs text-white shadow-xl" style={{ left: tip.x + 14, top: tip.y - 6, maxWidth: 260 }}>{tip.label}</div>
        )}
        <div className="absolute bottom-2 left-2 text-[10px] text-slate-500">Glisser · molette = zoom · clic point/pays = fiche</div>
      </div>

      {/* Country fiches */}
      <div className="mt-4">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Fiches pays ({countries.length})</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {countries.map((c) => (
            <button key={c.id} onClick={() => open('country', c.id)} className="panel p-2.5 text-left hover:border-slate-600 transition-all flex items-center gap-2">
              <FlagIcon code={c.flag} size="md" />
              <div className="min-w-0">
                <div className="text-sm font-bold text-white truncate">{c.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{(c.launchers?.length || 0)} lanceurs · {(c.spaceports?.length || 0)} sites</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

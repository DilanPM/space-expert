import React, { useState, useMemo } from 'react';
import { Scale, Plus, Check, X, GitCompare, Filter, Table2, LayoutGrid, Rocket, Search } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import { launchers, launcherById } from '../../data/index.js';
import { SectionHeader, Badge, Pill, Confidence, statusTone, flagCode } from '../common/ui.jsx';
import SpaceImage from '../common/SpaceImage.jsx';
import FlagIcon from '../common/FlagIcon.jsx';
import DataTable from '../common/DataTable.jsx';
import PropulsionTab from './PropulsionTab.jsx';
import Comparator from './Comparator.jsx';

const CATS = ['all', 'Micro', 'Small', 'Medium', 'Heavy', 'Super heavy'];
const STATUSES = [['all', 'Tous'], ['active', 'Opérationnel'], ['dev', 'En dev.'], ['retired', 'Retiré']];
const PROPS = [['all', 'Tous ergols'], ['solid', 'Solide'], ['cryo', 'Cryo LH2'], ['methane', 'Méthane'], ['liquid', 'Kéro/RP-1']];
const TRLS = [['all', 'Tous TRL'], ['3-9', 'TRL 3-9'], ['7-9', 'TRL 7-9 (matures)']];
const fmt = (n) => (n == null ? '—' : n.toLocaleString('fr-FR'));

function CompareBtn({ id }) {
  const compare = useAppStore((s) => s.compare);
  const toggle = useAppStore((s) => s.toggleCompare);
  const on = compare.includes(id);
  return (
    <button onClick={(e) => { e.stopPropagation(); toggle(id); }} title="Comparer"
      className={`p-1 rounded-md border transition-all ${on ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700 text-slate-500 hover:text-white hover:border-slate-500'}`}>
      {on ? <Check size={12} /> : <Plus size={12} />}
    </button>
  );
}

function LauncherCard({ l, onOpen }) {
  return (
    <div className="panel overflow-hidden group hover:border-slate-600 transition-all flex flex-col">
      <button onClick={onOpen} className="text-left"><SpaceImage query={l.wiki} alt={l.name} contain className="h-32 border-b border-slate-800" /></button>
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <button onClick={onOpen} className="text-left flex-1 min-w-0">
            <div className="font-bold text-white text-sm truncate group-hover:text-blue-300 transition-colors">{l.name}</div>
            <div className="text-[11px] text-slate-500 truncate">{l.manufacturer || '—'} · {l.manufacturerCountry || '—'}</div>
          </button>
          <CompareBtn id={l.id} />
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge tone={statusTone(l.status)}>{l.status || '—'}</Badge>
          {l.isEU && <Badge tone="gold">🇪🇺</Badge>}
          {l.trl && <Badge tone="indigo">TRL {l.trl}</Badge>}
        </div>
        <div className="grid grid-cols-3 gap-1 mt-3 text-center">
          {[['LEO', l.capLEO ? fmt(l.capLEO) : '—'], ['GTO', l.capGTO ? fmt(l.capGTO) : '—'], ['M$', l.priceCatalogueMUSD ?? '—']].map(([k, v]) => (
            <div key={k} className="bg-slate-950/60 rounded-md py-1"><div className="text-xs font-bold text-blue-300 tabular">{v}</div><div className="text-[9px] text-slate-600 uppercase">{k}</div></div>
          ))}
        </div>
        <div className="mt-2"><Confidence level={l.confidence} sources={l.sources} /></div>
      </div>
    </div>
  );
}

const CONF_RANK = { verified: 3, internalDB: 2, toConfirm: 1 };

export default function LaunchersModule() {
  const [tab, setTab] = useState('launchers');
  const f = useAppStore((s) => s.launcherFilters);
  const setF = useAppStore((s) => s.setLauncherFilter);
  const view = useAppStore((s) => s.launcherView);
  const setView = useAppStore((s) => s.setLauncherView);
  const search = useAppStore((s) => s.search);
  const setSearch = useAppStore((s) => s.setSearch);
  const openEntity = useAppStore((s) => s.openEntity);
  const compare = useAppStore((s) => s.compare);
  const toggleCompare = useAppStore((s) => s.toggleCompare);
  const clearCompare = useAppStore((s) => s.clearCompare);
  const [showCompare, setShowCompare] = useState(false);

  const list = useMemo(() => {
    let xs = launchers;
    if (f.scope === 'eu') xs = xs.filter((l) => l.isEU);
    else if (f.scope === 'world') xs = xs.filter((l) => !l.isEU);
    if (f.category !== 'all') xs = xs.filter((l) => (l.category || '').toLowerCase().replace(' ', '') === f.category.toLowerCase().replace(' ', ''));
    if (f.status !== 'all') xs = xs.filter((l) => l.statusGroup === f.status);
    if (f.propellant !== 'all') xs = xs.filter((l) => l.propType === f.propellant);
    if (f.reusable === 'reusable') xs = xs.filter((l) => /yes|partial|réutilis|reusab/i.test(l.reusability || ''));
    if (f.trl === '3-9') xs = xs.filter((l) => l.trl >= 3 && l.trl <= 9);
    else if (f.trl === '7-9') xs = xs.filter((l) => l.trl >= 7 && l.trl <= 9);
    if (f.verified === 'verified') xs = xs.filter((l) => l.confidence === 'verified');
    if (search.trim()) {
      const q = search.toLowerCase();
      xs = xs.filter((l) => `${l.name} ${l.manufacturer} ${l.family} ${l.abbreviation || ''}`.toLowerCase().includes(q));
    }
    const s = f.sort;
    xs = [...xs].sort((a, b) => s === 'name' ? a.name.localeCompare(b.name)
      : s === 'price' ? (a.priceCatalogueMUSD || 1e9) - (b.priceCatalogueMUSD || 1e9)
      : (b.capLEO || 0) - (a.capLEO || 0));
    return xs;
  }, [f, search]);

  const columns = useMemo(() => [
    { key: 'cmp', label: '+', sortable: false, width: 34, render: (l) => <CompareBtn id={l.id} /> },
    { key: 'name', label: 'Lanceur', width: 180, render: (l) => (
        <div className="flex items-center gap-1.5">
          {l.isEU && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" title="Europe" />}
          <span className="font-semibold text-white truncate">{l.name}</span>
        </div>) },
    { key: 'manufacturerCountry', label: 'Pays', width: 120, render: (l) => <span className="flex items-center gap-1.5 text-slate-400">{flagCode(l.manufacturerCountry) && <FlagIcon code={flagCode(l.manufacturerCountry)} size="xs" />}<span className="truncate">{l.manufacturerCountry || '—'}</span></span> },
    { key: 'category', label: 'Catég.', width: 80 },
    { key: 'status', label: 'Statut', width: 110, render: (l) => <Badge tone={statusTone(l.status)}>{(l.status || '—').slice(0, 16)}</Badge> },
    { key: 'trl', label: 'TRL', align: 'right', width: 50, render: (l) => l.trl ?? '—' },
    { key: 'capLEO', label: 'LEO', align: 'right', render: (l) => fmt(l.capLEO) },
    { key: 'capSSO', label: 'SSO', align: 'right', render: (l) => fmt(l.capSSO) },
    { key: 'capGTO', label: 'GTO', align: 'right', render: (l) => fmt(l.capGTO) },
    { key: 'priceCatalogueMUSD', label: 'Prix M$', align: 'right', render: (l) => fmt(l.priceCatalogueMUSD) },
    { key: 'priceLEOkUSDkg', label: '$/kg', align: 'right', render: (l) => fmt(l.priceLEOkUSDkg) },
    { key: 'propType', label: 'Ergol', width: 80, render: (l) => l.propType || '—' },
    { key: 'reuse', label: '♻', sortable: false, width: 36, render: (l) => /yes|partial|réutilis|reusab/i.test(l.reusability || '') ? '♻' : '' },
    { key: 'confidence', label: 'Source', width: 110, value: (l) => CONF_RANK[l.confidence] || 0, render: (l) => <Confidence level={l.confidence} sources={l.sources} /> },
  ], []);

  const ViewToggle = (
    <div className="flex gap-1">
      <Pill active={tab === 'launchers' && view === 'table'} onClick={() => { setTab('launchers'); setView('table'); }}><Table2 size={12} className="inline mr-1" />Tableau</Pill>
      <Pill active={tab === 'launchers' && view === 'cards'} onClick={() => { setTab('launchers'); setView('cards'); }}><LayoutGrid size={12} className="inline mr-1" />Cartes</Pill>
      <Pill active={tab === 'propulsion'} onClick={() => setTab('propulsion')}>Propulsion</Pill>
    </div>
  );

  if (tab === 'propulsion') {
    return (<><SectionHeader emoji="🚀" title="Lanceurs & Propulsion" subtitle={`${launchers.length} lanceurs · base mondiale & européenne`} right={ViewToggle} /><PropulsionTab /></>);
  }

  return (
    <>
      <SectionHeader emoji="🚀" title="Lanceurs & Propulsion"
        subtitle={`${list.length} affichés · ${launchers.filter((l) => l.isEU).length} européens / ${launchers.length} mondiaux`} right={ViewToggle} />

      {/* Filters */}
      <div className="panel p-3 mb-4 space-y-2">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filtrer les lanceurs (nom, fabricant, famille)…"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-8 py-1.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500" />
          {search && <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X size={14} /></button>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1"><Filter size={12} />Périmètre</span>
          <Pill active={f.scope === 'eu'} tone="amber" onClick={() => setF('scope', 'eu')}>🇪🇺 Europe</Pill>
          <Pill active={f.scope === 'world'} onClick={() => setF('scope', 'world')}>🌍 Monde</Pill>
          <Pill active={f.scope === 'all'} onClick={() => setF('scope', 'all')}>Tous</Pill>
          <span className="w-px h-4 bg-slate-700 mx-1" />
          {STATUSES.map(([v, lbl]) => <Pill key={v} active={f.status === v} onClick={() => setF('status', v)}>{lbl}</Pill>)}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-slate-500 font-bold">Catégorie</span>
          {CATS.map((c) => <Pill key={c} active={f.category === c} onClick={() => setF('category', c)}>{c === 'all' ? 'Toutes' : c}</Pill>)}
          <span className="w-px h-4 bg-slate-700 mx-1" />
          {TRLS.map(([v, lbl]) => <Pill key={v} active={f.trl === v} tone="amber" onClick={() => setF('trl', v)}>{lbl}</Pill>)}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-slate-500 font-bold">Ergol</span>
          {PROPS.map(([v, lbl]) => <Pill key={v} active={f.propellant === v} onClick={() => setF('propellant', v)}>{lbl}</Pill>)}
          <span className="w-px h-4 bg-slate-700 mx-1" />
          <Pill active={f.reusable === 'reusable'} tone="amber" onClick={() => setF('reusable', f.reusable === 'reusable' ? 'all' : 'reusable')}>♻ Réutilisable</Pill>
          <Pill active={f.verified === 'verified'} tone="amber" onClick={() => setF('verified', f.verified === 'verified' ? 'all' : 'verified')}>✓ Vérifié</Pill>
        </div>
      </div>

      {/* Table or Cards */}
      {view === 'table' ? (
        <DataTable rows={list.slice(0, 400)} columns={columns} getKey={(l) => l.id} onRowClick={(l) => openEntity('launcher', l.id)}
          initialSort={{ key: f.sort === 'price' ? 'priceCatalogueMUSD' : f.sort === 'name' ? 'name' : 'capLEO', dir: f.sort === 'name' ? 'asc' : 'desc' }} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {list.slice(0, 120).map((l) => <LauncherCard key={l.id} l={l} onOpen={() => openEntity('launcher', l.id)} />)}
        </div>
      )}
      {list.length > (view === 'table' ? 400 : 120) && <div className="text-center text-xs text-slate-500 mt-3">… {list.length - (view === 'table' ? 400 : 120)} de plus — affinez les filtres</div>}
      {list.length === 0 && <div className="panel p-10 text-center text-slate-500">Aucun lanceur ne correspond.</div>}

      {/* Compare tray */}
      {compare.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 panel-raised px-3 py-2 flex items-center gap-3 shadow-2xl">
          <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5"><GitCompare size={14} className="text-amber-400" />{compare.length} sélectionné{compare.length > 1 ? 's' : ''}</span>
          <div className="hidden sm:flex gap-1">{compare.map((id) => <Badge key={id} tone="gold">{launcherById[id]?.name}<button onClick={() => toggleCompare(id)} className="ml-1 opacity-60 hover:opacity-100"><X size={10} /></button></Badge>)}</div>
          <button onClick={() => setShowCompare(true)} disabled={compare.length < 2} className="bg-amber-500 disabled:opacity-40 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"><Scale size={13} />Comparer</button>
          <button onClick={clearCompare} className="text-slate-500 hover:text-white"><X size={15} /></button>
        </div>
      )}
      {showCompare && <Comparator ids={compare} onClose={() => setShowCompare(false)} />}
    </>
  );
}

import React from 'react';
import {
  LayoutDashboard, Rocket, Globe2, Radar, Map, Building2, Scale, Beaker, Workflow, Search, Satellite,
  BarChart3, CalendarClock, PanelLeftClose, PanelLeftOpen, Boxes, Droplets,
} from 'lucide-react';
import { useAppStore } from './store/useAppStore.js';
import EntityDrawer from './components/common/EntityDrawer.jsx';
import GlobalSearch from './components/common/GlobalSearch.jsx';
import Dashboard from './components/Dashboard.jsx';
import LaunchersModule from './components/launchers/LaunchersModule.jsx';
import LaunchModule from './components/launches/LaunchModule.jsx';
import StatsModule from './components/stats/StatsModule.jsx';
import SpaceportsModule from './components/spaceports/SpaceportsModule.jsx';
import CSGModule from './components/csg/CSGModule.jsx';
import StrategicMap from './components/maps/StrategicMap.jsx';
import GovernanceModule from './components/governance/GovernanceModule.jsx';
import PolicyModule from './components/policy/PolicyModule.jsx';
import CRMModule from './components/materials/CRMModule.jsx';
import PFASModule from './components/materials/PFASModule.jsx';
import MaterialsModule from './components/materials/MaterialsModule.jsx';
import ProcessModule from './components/process/ProcessModule.jsx';
import { launchers, spaceports } from './data/index.js';

const NAV = [
  { mode: 'home', icon: LayoutDashboard, emoji: '🛰️', label: 'Tour de contrôle', group: 'Vue d\'ensemble' },
  { mode: 'launch', icon: CalendarClock, emoji: '🚀', label: 'Lancements', group: 'Vue d\'ensemble' },
  { mode: 'stats', icon: BarChart3, emoji: '📊', label: 'Statistiques', group: 'Vue d\'ensemble' },
  { mode: 'launchers', icon: Rocket, emoji: '🚀', label: 'Lanceurs & Propulsion', group: 'Bases techniques' },
  { mode: 'spaceports', icon: Globe2, emoji: '🌍', label: 'Spaceports & Infra', group: 'Bases techniques' },
  { mode: 'csg', icon: Radar, emoji: '🇬🇫', label: 'CSG — Kourou', group: 'Bases techniques' },
  { mode: 'map', icon: Map, emoji: '🗺️', label: 'Carte stratégique', group: 'Bases techniques' },
  { mode: 'governance', icon: Building2, emoji: '🏛️', label: 'Gouvernance & Écosystème', group: 'Politique' },
  { mode: 'policy', icon: Scale, emoji: '⚖️', label: 'Politique, Droit & Budget', group: 'Politique' },
  { mode: 'crm', icon: Boxes, emoji: '⛏️', label: 'CRM & matières critiques', group: 'Matières & chaîne de valeur' },
  { mode: 'pfas', icon: Droplets, emoji: '🧴', label: 'REACH / PFAS', group: 'Matières & chaîne de valeur' },
  { mode: 'materials', icon: Beaker, emoji: '🧪', label: 'Ergols & chimie', group: 'Matières & chaîne de valeur' },
  { mode: 'process', icon: Workflow, emoji: '🛠️', label: 'Process & Cycle de vie', group: 'Référence' },
];

const MODULES = {
  home: Dashboard, launch: LaunchModule, stats: StatsModule, launchers: LaunchersModule,
  spaceports: SpaceportsModule, csg: CSGModule, map: StrategicMap, governance: GovernanceModule,
  policy: PolicyModule, crm: CRMModule, pfas: PFASModule, materials: MaterialsModule, process: ProcessModule,
};

function Sidebar() {
  const viewMode = useAppStore((s) => s.viewMode);
  const setViewMode = useAppStore((s) => s.setViewMode);
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggle = useAppStore((s) => s.toggleSidebar);
  let lastGroup = null;
  return (
    <aside className={`hidden lg:flex flex-col flex-shrink-0 border-r border-slate-800 bg-slate-950 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto overflow-x-hidden transition-all duration-200 ${collapsed ? 'w-14' : 'w-60'}`}>
      <button onClick={toggle} title={collapsed ? 'Déplier' : 'Replier'}
        className="flex items-center gap-2 m-2 px-2.5 py-1.5 rounded-lg text-slate-500 hover:bg-slate-900 hover:text-white text-xs">
        {collapsed ? <PanelLeftOpen size={16} /> : <><PanelLeftClose size={16} /><span>Replier</span></>}
      </button>
      <nav className="px-2 pb-2">
        {NAV.map(({ mode, icon: Icon, label, group }) => {
          const header = group !== lastGroup ? (lastGroup = group) : null;
          const active = viewMode === mode;
          return (
            <React.Fragment key={mode}>
              {header && !collapsed && <div className="px-2 pt-3 pb-1 text-[10px] uppercase tracking-widest text-slate-600 font-bold">{header}</div>}
              {header && collapsed && <div className="h-px bg-slate-800 my-1.5 mx-1" />}
              <button onClick={() => setViewMode(mode)} title={label}
                className={`w-full flex items-center gap-2.5 ${collapsed ? 'justify-center px-0' : 'px-2.5'} py-2 rounded-lg text-sm font-medium transition-all ${
                  active ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}>
                <Icon size={16} className={active ? 'text-white' : 'text-slate-500'} />
                {!collapsed && <span className="truncate">{label}</span>}
              </button>
            </React.Fragment>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="mt-auto p-3 text-[10px] text-slate-600 border-t border-slate-800">
          <div className="font-bold text-slate-500">Space Expert v0.2</div>
          <div>{launchers.length} lanceurs · {spaceports.length} spaceports</div>
          <div>DG DEFIS D1 · SSOT</div>
        </div>
      )}
    </aside>
  );
}

function Header() {
  const setViewMode = useAppStore((s) => s.setViewMode);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 flex items-center gap-3 px-4">
      <button onClick={() => setViewMode('home')} className="flex items-center gap-2 flex-shrink-0">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
          <Satellite size={18} className="text-white" />
        </div>
        <div className="hidden sm:block leading-tight text-left">
          <div className="text-sm font-extrabold text-white">Space Expert</div>
          <div className="text-[10px] text-slate-500">EU Access to Space · DG DEFIS D1</div>
        </div>
      </button>

      <button onClick={() => setSearchOpen(true)}
        className="flex-1 max-w-md mx-auto flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:border-slate-600 transition-colors">
        <Search size={15} /><span className="flex-1 text-left truncate">Rechercher partout…</span>
        <kbd className="hidden sm:inline text-[10px] border border-slate-700 rounded px-1.5 py-0.5 text-slate-500">Ctrl K</kbd>
      </button>

      <div className="hidden md:flex items-center gap-2 flex-shrink-0">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-950 border border-slate-800 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
          Live · juin 2026
        </span>
      </div>
    </header>
  );
}

// Mobile nav (horizontal scroll)
function MobileNav() {
  const viewMode = useAppStore((s) => s.viewMode);
  const setViewMode = useAppStore((s) => s.setViewMode);
  return (
    <nav className="lg:hidden flex gap-1 overflow-x-auto no-scrollbar px-2 py-1.5 border-b border-slate-800 bg-slate-950 sticky top-14 z-20">
      {NAV.map(({ mode, emoji, label }) => (
        <button key={mode} onClick={() => setViewMode(mode)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
            viewMode === mode ? 'bg-blue-600 text-white' : 'text-slate-400 bg-slate-900'}`}>
          <span>{emoji}</span>{label.split(' ')[0]}
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const viewMode = useAppStore((s) => s.viewMode);
  const searchOpen = useAppStore((s) => s.searchOpen);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
  const Module = MODULES[viewMode] || Dashboard;

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSearchOpen]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <MobileNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-3 sm:p-5 max-w-[1500px]">
          <Module />
        </main>
      </div>
      <EntityDrawer />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

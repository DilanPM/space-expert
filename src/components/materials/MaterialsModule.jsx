import React, { useMemo, useState } from 'react';
import { Beaker, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import { criticalMaterials } from '../../data/index.js';
import { SectionHeader, Badge, Pill, Confidence } from '../common/ui.jsx';
import DataTable from '../common/DataTable.jsx';

function riskTone(r = '') {
  const t = r.toLowerCase();
  if (t.includes('high') || t.includes('élev')) return 'red';
  if (t.includes('medium') || t.includes('moy')) return 'amber';
  if (t.includes('low') || t.includes('faible')) return 'green';
  return 'slate';
}
const RISK_RANK = { red: 3, amber: 2, green: 1, slate: 0 };

export default function MaterialsModule() {
  const open = useAppStore((s) => s.openEntity);
  const [view, setView] = useState('cards');
  const groups = useMemo(() => {
    const g = {};
    criticalMaterials.forEach((m) => { (g[m.category || 'Autres'] ||= []).push(m); });
    return g;
  }, []);
  const pfasCount = criticalMaterials.filter((m) => /yes|oui/i.test(m.pfas || '')).length;
  const highRisk = criticalMaterials.filter((m) => /high|élev/i.test(m.supplierRisk || '')).length;

  const columns = [
    { key: 'material', label: 'Matière', width: 150, render: (m) => <span className="font-semibold text-white">{m.material}</span> },
    { key: 'category', label: 'Catégorie', width: 130, render: (m) => <span className="text-slate-400">{m.category}</span> },
    { key: 'spaceUse', label: 'Usage spatial', width: 160, render: (m) => <span className="text-slate-300">{m.spaceUse || '—'}</span> },
    { key: 'launcherRole', label: 'Rôle lanceurs', render: (m) => <span className="text-slate-300">{m.launcherRole || '—'}</span> },
    { key: 'satelliteRole', label: 'Rôle satellites', render: (m) => <span className="text-slate-300">{m.satelliteRole || '—'}</span> },
    { key: 'reg', label: 'REACH/PFAS', width: 110, sortable: false, render: (m) => (
        <span className="flex flex-wrap gap-1">{m.euRegulation && /reach|svhc/i.test(m.euRegulation) && <Badge tone="amber">REACH</Badge>}{/yes|oui/i.test(m.pfas || '') && <Badge tone="red">PFAS</Badge>}</span>) },
    { key: 'suppliers', label: 'Fournisseurs EU', render: (m) => <span className="text-slate-400 text-[11px]">{m.suppliers || '—'}</span> },
    { key: 'supplierRisk', label: 'Risque autonomie', width: 120, value: (m) => RISK_RANK[riskTone(m.supplierRisk)], render: (m) => m.supplierRisk ? <Badge tone={riskTone(m.supplierRisk)}>{m.supplierRisk.split(/[;.]/)[0].slice(0, 14)}</Badge> : '—' },
  ];

  return (
    <>
      <SectionHeader emoji="🧪" title="Matières & chimies critiques"
        subtitle="Ergols, matériaux, REACH / PFAS, dépendances supply-chain & autonomie stratégique UE"
        right={<div className="flex gap-1"><Pill active={view === 'cards'} onClick={() => setView('cards')}>Cartes</Pill><Pill active={view === 'table'} onClick={() => setView('table')}>Tableau</Pill></div>} />

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="panel p-3"><div className="text-2xl font-bold text-blue-400 tabular">{criticalMaterials.length}</div><div className="text-[11px] text-slate-500">matières suivies</div></div>
        <div className="panel p-3"><div className="text-2xl font-bold text-amber-400 tabular">{pfasCount}</div><div className="text-[11px] text-slate-500 flex items-center gap-1"><ShieldAlert size={11} />pertinence PFAS</div></div>
        <div className="panel p-3"><div className="text-2xl font-bold text-red-400 tabular">{highRisk}</div><div className="text-[11px] text-slate-500 flex items-center gap-1"><AlertTriangle size={11} />risque autonomie élevé</div></div>
      </div>

      {view === 'table' ? (
        <DataTable rows={criticalMaterials} columns={columns} getKey={(m) => m.id} onRowClick={(m) => open('material', m.id)} initialSort={{ key: 'supplierRisk', dir: 'desc' }} />
      ) : (
        Object.entries(groups).map(([cat, items]) => (
          <div key={cat} className="mb-4">
            <Badge tone="indigo"><Beaker size={11} />{cat}</Badge>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
              {items.map((m) => (
                <button key={m.id} onClick={() => open('material', m.id)} className="panel p-3 text-left hover:border-slate-600 transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-white text-sm">{m.material}</div>
                    {m.supplierRisk && <Badge tone={riskTone(m.supplierRisk)}>{m.supplierRisk.split(/[;.]/)[0].slice(0, 10)}</Badge>}
                  </div>
                  {m.spaceUse && <div className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">{m.spaceUse}</div>}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {m.euRegulation && /reach|svhc/i.test(m.euRegulation) && <Badge tone="amber">REACH</Badge>}
                    {/yes|oui/i.test(m.pfas || '') && <Badge tone="red">PFAS</Badge>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}

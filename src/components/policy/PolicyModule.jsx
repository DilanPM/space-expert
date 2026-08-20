import React from 'react';
import { Scale, CheckCircle2, Circle, AlertTriangle, ArrowRight, Euro } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAppStore } from '../../store/useAppStore.js';
import { SectionHeader, Badge, Confidence } from '../common/ui.jsx';
import FlagIcon from '../common/FlagIcon.jsx';
import { spaceAct, programme, ecf, budgetContext, elc, ffpa } from '../../data/curated/policy.js';

export default function PolicyModule() {
  const open = useAppStore((s) => s.openEntity);
  return (
    <>
      <SectionHeader emoji="⚖️" title="Politique, Droit & Budget"
        subtitle="EU Space Act · Programme spatial / Art. 65 · ECF (European Competitiveness Fund) · FFPA · ELC" />

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Space Act */}
        <div className="panel p-4">
          <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
            <h3 className="font-bold text-white flex items-center gap-2"><Scale size={16} className="text-blue-400" />{spaceAct.title}</h3>
            <div className="flex gap-1"><Badge tone="amber">Proposé {spaceAct.proposed}</Badge><Confidence level={spaceAct.confidence} sources={spaceAct.sources} /></div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">{spaceAct.summary}</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {spaceAct.pillars.map((p) => (
              <div key={p.id} className="rounded-lg p-2 border" style={{ borderColor: p.color + '55', background: p.color + '11' }}>
                <div className="text-xs font-bold" style={{ color: p.color }}>{p.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">{p.desc}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-2.5 bg-amber-500/10 border border-amber-500/30 mb-3">
            <div className="text-[11px] font-bold text-amber-300 mb-0.5">🚀 Access to Space</div>
            <div className="text-[11px] text-slate-300 leading-snug">{spaceAct.accessToSpace}</div>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">Parcours législatif</div>
          <div className="space-y-1.5">
            {spaceAct.stages.map((st, i) => (
              <div key={i} className="flex items-center gap-2">
                {st.done ? <CheckCircle2 size={15} className="text-green-400" /> : <Circle size={15} className="text-slate-600" />}
                <span className={`text-xs ${st.done ? 'text-slate-200' : 'text-slate-500'}`}>{st.label}</span>
                <span className="ml-auto text-[10px] text-slate-600">{st.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Programme + ECF */}
        <div className="space-y-4">
          <div className="panel p-4">
            <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
              <h3 className="font-bold text-white">{programme.title}</h3>
              <Confidence level={programme.confidence} sources={programme.sources} />
            </div>
            <div className="text-[11px] text-slate-500 mb-2">{programme.regulation} · {programme.envelope}</div>
            <div className="grid grid-cols-2 gap-2">
              {programme.components.map((c) => (
                <div key={c.id} className={`rounded-lg p-2 border ${c.highlight ? 'border-amber-500/40 bg-amber-500/10' : 'border-slate-700 bg-slate-900/40'}`}>
                  <div className={`text-xs font-bold ${c.highlight ? 'text-amber-300' : 'text-slate-200'}`}>{c.label}</div>
                  <div className="text-[10px] text-slate-500">{c.desc}</div>
                  <div className="text-[9px] text-slate-600 mt-0.5">▸ {c.op}</div>
                </div>
              ))}
            </div>
          </div>
          {/* ECF — European Competitiveness Fund */}
          <div className="panel p-4 border-amber-500/30">
            <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
              <h3 className="font-bold text-amber-300 flex items-center gap-2"><Euro size={15} />{ecf.title}</h3>
              <div className="flex gap-1"><Badge tone="blue">{ecf.period}</Badge><Confidence level={ecf.confidence} sources={ecf.sources} /></div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">{ecf.what}</p>
            <div className="rounded-lg p-2.5 bg-amber-500/10 border border-amber-500/30 mb-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-200">{ecf.spaceWindow.label}</span>
                <span className="text-lg font-extrabold text-amber-300 tabular">{ecf.spaceWindow.amount}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{ecf.spaceWindow.note}</div>
            </div>
            <div className="text-[11px] text-slate-500 leading-snug">{ecf.note}</div>
          </div>
        </div>
      </div>

      {/* Budget context */}
      <div className="panel p-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-white">Contexte budgétaire — enveloppes spatiales</h3>
          <Confidence level="verified" sources={['EC', 'ESA']} />
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={budgetContext} layout="vertical" margin={{ left: 8, right: 30 }}>
            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={(v) => `${v} Md€`} />
            <YAxis type="category" dataKey="label" width={170} tick={{ fill: '#cbd5e1', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} formatter={(v, n, p) => [`${v} Md€ · ${p.payload.period}`, '']} cursor={{ fill: '#1e293b55' }} />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>{budgetContext.map((d, i) => <Cell key={i} fill={d.color} />)}</Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="text-[10px] text-slate-600">⚠️ Périmètres & périodes différents (pluriannuel vs annuel) — à titre indicatif.</div>
      </div>

      {/* FFPA flow */}
      <div className="panel p-4 mt-4">
        <div className="flex items-center justify-between"><h3 className="font-bold text-white mb-1">{ffpa.title}</h3><Confidence level={ffpa.confidence} sources={ffpa.sources} /></div>
        <p className="text-xs text-slate-400 mb-3">{ffpa.desc}</p>
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          <button onClick={() => open('institution', 'ec-defis')} className="flex-1 panel p-3 text-center hover:border-blue-500/50">
            <FlagIcon code="eu" size="md" className="mx-auto mb-1" />
            <div className="text-sm font-bold text-blue-300">Commission · DG DEFIS</div>
            <div className="text-[10px] text-slate-500">Budget & politique</div>
          </button>
          <div className="flex flex-col justify-center gap-6 px-1">
            <div className="hidden md:flex items-center gap-1 text-amber-400"><ArrowRight size={18} /></div>
            <div className="hidden md:flex items-center gap-1 text-green-400"><ArrowRight size={18} /></div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <button onClick={() => open('institution', 'esa')} className="panel p-3 text-center hover:border-amber-500/50 flex-1">
              <div className="text-sm font-bold text-amber-300">ESA</div><div className="text-[10px] text-slate-500">Maîtrise d'œuvre technique · développement</div>
            </button>
            <button onClick={() => open('institution', 'euspa')} className="panel p-3 text-center hover:border-green-500/50 flex-1">
              <div className="text-sm font-bold text-green-300">EUSPA</div><div className="text-[10px] text-slate-500">Exploitation · sécurité · marché</div>
            </button>
          </div>
        </div>
      </div>

      {/* ELC */}
      <div className="panel p-4 mt-4">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
          <h3 className="font-bold text-white">{elc.title}</h3>
          <div className="flex gap-1"><Badge tone="gold">{elc.committed}</Badge><Confidence level={elc.confidence} sources={elc.sources} /></div>
        </div>
        <p className="text-xs text-slate-400 mb-3">{elc.desc}</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {elc.selected.map((e) => (
            <div key={e.company} className={`panel p-2.5 text-center ${e.withdrawn ? 'opacity-50' : ''}`}>
              <FlagIcon code={e.country} size="sm" className="mx-auto mb-1" />
              <div className="text-xs font-bold text-white">{e.launcher}</div>
              <div className="text-[10px] text-slate-500">{e.company}</div>
              {e.withdrawn && <div className="text-[9px] text-red-400 mt-0.5">retiré (fév. 2026)</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Rocket, MapPin, Factory, Building2, Beaker, Globe2, Scale, Boxes, Droplets, CornerDownLeft } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  launchers, spaceports, csgLaunchpads, companies, institutions, countries, criticalMaterials,
  crmMaterials, pfasFamilies, CRM_COUNTRY,
} from '../../data/index.js';

const ICONS = { launcher: Rocket, spaceport: MapPin, pad: MapPin, company: Factory, institution: Building2, country: Globe2, material: Beaker, crm: Boxes, page: Scale };
const TYPE_LABEL = { launcher: 'Lanceur', spaceport: 'Spaceport', pad: 'Pas de tir', company: 'Acteur', institution: 'Institution', country: 'Pays', material: 'Matière', crm: 'CRM', page: 'Page' };

// Build the global index once
const INDEX = [
  ...launchers.map((l) => ({ type: 'launcher', id: l.id, label: l.name, sub: `${l.manufacturer || ''} ${l.category || ''}`.trim(), kw: `${l.manufacturerCountry} ${l.family} ${l.abbreviation || ''}`, rank: l.confidence === 'verified' ? 3 : l.isEU ? 2 : 1 })),
  ...spaceports.map((s) => ({ type: 'spaceport', id: s.id, label: s.name, sub: s.country, kw: s.location, rank: 3 })),
  ...csgLaunchpads.map((p) => ({ type: 'pad', id: p.id, label: p.code ? `${p.code} — ${p.name}` : p.name, sub: p.tenant || 'CSG', kw: (p.uses || []).join(' '), rank: 2 })),
  ...companies.map((c) => ({ type: 'company', id: c.id, label: c.name, sub: c.country, kw: (c.products || []).join(' '), rank: 2 })),
  ...institutions.map((i) => ({ type: 'institution', id: i.id, label: i.name, sub: i.short, kw: i.hq?.city, rank: 3 })),
  ...countries.map((c) => ({ type: 'country', id: c.id, label: c.name, sub: 'fiche pays', kw: c.flag, rank: 2 })),
  ...criticalMaterials.map((m) => ({ type: 'material', id: m.id, label: m.material, sub: m.category, kw: m.spaceUse, rank: 1 })),
  ...crmMaterials.map((m) => ({ type: 'crm', id: m.id, label: m.name, sub: `${m.category} · ${CRM_COUNTRY[m.dominantCountry]?.name || ''}`.trim(), kw: `${m.symbol} ${m.strategicRelevance} matière critique crm`, rank: 2 })),
  ...pfasFamilies.map((f) => ({ type: 'page', id: 'pfas', label: `${f.name}${f.abbr && f.abbr !== '—' ? ` · ${f.abbr}` : ''}`, sub: 'REACH / PFAS', kw: `${f.aliases || ''} ${f.examples} pfas fluoropolymere`, rank: 1 })),
  { type: 'page', id: 'launch', label: 'Lancements — timeline', sub: 'Galileo · Copernicus · IRIS²', kw: 'launch lancement timeline galileo iris2 va262 vega', rank: 3 },
  { type: 'page', id: 'stats', label: 'Statistiques spatiales', sub: 'satellites · débris · coûts', kw: 'stats satellites debris orbite cout classes', rank: 3 },
  { type: 'page', id: 'policy', label: 'EU Space Act', sub: 'Politique', kw: 'space act loi reglement', rank: 3 },
  { type: 'page', id: 'policy', label: 'ECF — European Competitiveness Fund', sub: 'Budget', kw: 'ecf budget mff 2028', rank: 3 },
  { type: 'page', id: 'policy', label: 'FFPA · Art. 65 Access to Space', sub: 'Politique', kw: 'ffpa article 65 budget', rank: 2 },
  { type: 'page', id: 'crm', label: 'CRM — dépendances matières critiques', sub: 'Matières & chaîne de valeur', kw: 'crm terres rares gallium germanium niobium crma aimants supply chain autonomie', rank: 3 },
  { type: 'page', id: 'pfas', label: 'REACH / PFAS — composants fluorés', sub: 'Matières & chaîne de valeur', kw: 'pfas reach ptfe pfpe viton kynar fluoropolymere restriction echa', rank: 3 },
  { type: 'page', id: 'materials', label: 'Ergols & chimie (hydrazine, HAN, LOX)', sub: 'Matières & chaîne de valeur', kw: 'ergols propergols hydrazine han adn lox chimie', rank: 2 },
  { type: 'page', id: 'process', label: 'Cycle de vie — design → opérations', sub: 'Process', kw: 'process lifecycle phases', rank: 1 },
];

export default function GlobalSearch({ open, onClose }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const openEntity = useAppStore((s) => s.openEntity);
  const setViewMode = useAppStore((s) => s.setViewMode);
  const inputRef = useRef(null);

  useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 40); } }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return INDEX.filter((x) => x.rank >= 3).slice(0, 8);
    const scored = [];
    for (const it of INDEX) {
      const hay = `${it.label} ${it.sub} ${it.kw}`.toLowerCase();
      const lbl = it.label.toLowerCase();
      let score = 0;
      if (lbl.startsWith(term)) score = 100;
      else if (lbl.includes(term)) score = 60;
      else if (hay.includes(term)) score = 30;
      if (score) scored.push({ ...it, score: score + it.rank });
    }
    return scored.sort((a, b) => b.score - a.score).slice(0, 24);
  }, [q]);

  useEffect(() => { setSel(0); }, [q]);

  const activate = (it) => {
    if (!it) return;
    if (it.type === 'page') setViewMode(it.id);
    else openEntity(it.type, it.id);
    onClose();
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); activate(results[sel]); }
    else if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] bg-black/60 flex items-start justify-center pt-[12vh] px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div initial={{ scale: 0.97, y: -8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-slate-950 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-3 border-b border-slate-800">
              <Search size={16} className="text-slate-500" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
                placeholder="Rechercher partout — lanceur, spaceport, acteur, pays, matière, politique…"
                className="flex-1 bg-transparent py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none" />
              <kbd className="text-[10px] text-slate-600 border border-slate-700 rounded px-1.5 py-0.5">Esc</kbd>
            </div>
            <div className="max-h-[52vh] overflow-y-auto py-1">
              {results.length === 0 && <div className="px-4 py-6 text-center text-sm text-slate-500">Aucun résultat pour « {q} »</div>}
              {results.map((it, i) => {
                const Icon = ICONS[it.type] || Rocket;
                return (
                  <button key={`${it.type}-${it.id}-${i}`} onClick={() => activate(it)} onMouseEnter={() => setSel(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left ${i === sel ? 'bg-blue-600/20' : 'hover:bg-slate-900'}`}>
                    <Icon size={15} className={i === sel ? 'text-blue-300' : 'text-slate-500'} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{it.label}</div>
                      {it.sub && <div className="text-[11px] text-slate-500 truncate">{it.sub}</div>}
                    </div>
                    <span className="text-[10px] text-slate-600 flex-shrink-0">{TYPE_LABEL[it.type]}</span>
                    {i === sel && <CornerDownLeft size={13} className="text-slate-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
            <div className="px-3 py-1.5 border-t border-slate-800 text-[10px] text-slate-600 flex gap-3">
              <span>↑↓ naviguer</span><span>↵ ouvrir</span><span>{INDEX.length} entités indexées</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

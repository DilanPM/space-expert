import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Rocket, MapPin, Factory, Building2, Beaker, Globe2, Boxes, Gauge, Euro, Calendar, TrendingUp, ExternalLink } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore.js';
import { Badge, KeyVal, Chip, MultiLine, statusTone, Confidence } from './ui.jsx';
import SpaceImage from './SpaceImage.jsx';
import FlagIcon from './FlagIcon.jsx';
import {
  launcherById, spaceportById, padById, companyById, institutionById, countryById,
  companyForLauncher, padForLauncher, criticalMaterials, crmById, CRM_COUNTRY,
} from '../../data/index.js';

const fmt = (n) => (n == null ? '—' : typeof n === 'number' ? n.toLocaleString('fr-FR') : n);
const kg = (n) => (n == null ? '—' : `${fmt(n)} kg`);

function Section({ title, children }) {
  return (
    <div className="mt-4">
      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">{title}</div>
      {children}
    </div>
  );
}

// ── Launcher ────────────────────────────────────────────────────────────────
function LauncherFiche({ l, open }) {
  const company = companyForLauncher(l.id);
  const pad = padForLauncher(l);
  return (
    <>
      <SpaceImage query={l.wiki} alt={l.name} contain className="h-44 rounded-xl border border-slate-800 mb-3" />
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <Badge tone={statusTone(l.status)}>{l.status || '—'}</Badge>
        {l.isEU && <Badge tone="gold">🇪🇺 Europe</Badge>}
        {l.category && <Badge tone="blue">{l.category}</Badge>}
        {l.propType && <Badge tone="indigo">{l.propType}</Badge>}
        {l.reusability && /yes|partial|réutilis|reusab/i.test(l.reusability) && <Badge tone="green">♻ Réutilisable</Badge>}
        <Confidence level={l.confidence} sources={l.sources} />
      </div>
      {l.summary && <p className="text-sm text-slate-300 leading-relaxed mb-2">{l.summary}</p>}

      <Section title="Performances">
        <div className="panel p-3 grid grid-cols-2 gap-x-4">
          <KeyVal k="LEO" v={kg(l.capLEO)} mono />
          <KeyVal k="SSO" v={kg(l.capSSO)} mono />
          <KeyVal k="GTO" v={kg(l.capGTO)} mono />
          <KeyVal k="GEO" v={kg(l.capGEO)} mono />
          <KeyVal k="Prix" v={l.priceCatalogueMUSD ? `${fmt(l.priceCatalogueMUSD)} M$` : '—'} mono />
          <KeyVal k="$/kg LEO" v={l.priceLEOkUSDkg ? `${fmt(l.priceLEOkUSDkg)} k$` : '—'} mono />
          <KeyVal k="TRL" v={l.trl ?? '—'} mono />
          <KeyVal k="Cadence/an" v={l.maxLaunchRate ?? '—'} mono />
        </div>
      </Section>

      {(l.propStage1 || l.booster) && (
        <Section title="Propulsion">
          <div className="panel p-3 space-y-1">
            {l.booster && <KeyVal k="Boosters" v={l.booster} />}
            {l.propStage1 && <KeyVal k="1er étage" v={l.propStage1} />}
            {l.propStage2 && <KeyVal k="2e étage" v={l.propStage2} />}
            {l.propStage3 && <KeyVal k="3e étage" v={l.propStage3} />}
          </div>
        </Section>
      )}

      <Section title="Liens">
        <div className="flex flex-wrap gap-1.5">
          {company && <Chip icon={Factory} onClick={() => open('company', company.id)}>{company.name}</Chip>}
          {pad && <Chip icon={MapPin} tone="amber" onClick={() => open('pad', pad.id)}>{pad.name}</Chip>}
          {l.spaceportCountry && <Badge tone="slate"><MapPin size={10} />{l.spaceportCountry}</Badge>}
        </div>
      </Section>

      {(l.fundings || l.needs || l.techInfo || l.additionalInfo) && (
        <Section title="Analyse">
          {l.fundings && <div className="mb-2"><span className="text-[11px] text-amber-400 font-bold">Financement · </span><span className="text-xs text-slate-300">{l.fundings}</span></div>}
          {l.needs && <div className="mb-2"><span className="text-[11px] text-red-400 font-bold">Besoins · </span><span className="text-xs text-slate-300">{l.needs}</span></div>}
          {l.techInfo && <MultiLine text={l.techInfo} className="mb-2" />}
          {l.additionalInfo && <p className="text-xs text-slate-400 leading-relaxed">{l.additionalInfo}</p>}
        </Section>
      )}
      <div className="mt-3 text-[11px] text-slate-600">Fabricant : {l.manufacturer || '—'} · {l.manufacturerCountry || '—'} · Maiden : {l.maidenLaunch || '—'}</div>
    </>
  );
}

// ── Spaceport ───────────────────────────────────────────────────────────────
function SpaceportFiche({ sp }) {
  return (
    <>
      <SpaceImage query={sp.name.split('(')[0].trim()} alt={sp.name} className="h-40 rounded-xl border border-slate-800 mb-3" icon={MapPin} />
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <Badge tone={statusTone(sp.status2025 || sp.status)}>{sp.status || sp.status2025}</Badge>
        {sp.launchType && <Badge tone="blue">{sp.launchType}</Badge>}
        <Confidence level={sp.confidence} sources={sp.sources} />
      </div>
      <div className="text-sm text-slate-400 mb-2 flex items-center gap-1.5"><MapPin size={13} />{sp.location} · {sp.country}</div>
      {sp.coords && <div className="text-[11px] text-slate-600 tabular mb-2">{sp.coords[1].toFixed(3)}°, {sp.coords[0].toFixed(3)}°</div>}

      <Section title="Compatibilité lanceurs"><MultiLine text={sp.compatibility} /></Section>
      <Section title="Partenaires"><MultiLine text={sp.partners} /></Section>
      {sp.euInterest && <Section title="Intérêt stratégique UE"><MultiLine text={sp.euInterest} /></Section>}
      {sp.euFunding && <Section title="Financement UE"><MultiLine text={sp.euFunding} /></Section>}
      {sp.history && <Section title="Historique"><MultiLine text={sp.history} /></Section>}
      {sp.nextSteps && <Section title="Prochaines étapes"><MultiLine text={sp.nextSteps} /></Section>}
      <div className="grid grid-cols-1 gap-2 mt-3">
        {sp.advantages && <div className="panel p-2.5"><div className="text-[11px] text-green-400 font-bold mb-1">✓ Avantages</div><MultiLine text={sp.advantages} /></div>}
        {sp.disadvantages && <div className="panel p-2.5"><div className="text-[11px] text-red-400 font-bold mb-1">✗ Inconvénients</div><MultiLine text={sp.disadvantages} /></div>}
      </div>
    </>
  );
}

// ── Pad ─────────────────────────────────────────────────────────────────────
function PadFiche({ pad, open }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <Badge tone={statusTone(pad.status)}>{pad.status || '—'}</Badge>
        {pad.tenant && <Badge tone="indigo"><Factory size={10} />{pad.tenant}</Badge>}
      </div>
      {pad.coords && <div className="text-[11px] text-slate-500 tabular mb-3">📍 {pad.coords[1].toFixed(4)}°N {Math.abs(pad.coords[0]).toFixed(4)}°W · Centre Spatial Guyanais</div>}
      {pad.uses?.length > 0 && <Section title="Usages"><ul className="space-y-1">{pad.uses.map((u, i) => <li key={i} className="text-xs text-slate-300 flex gap-2"><span className="text-amber-500">▹</span>{u}</li>)}</ul></Section>}
      {pad.notableLaunches?.length > 0 && <Section title="Lancements notables"><div className="text-xs text-slate-400 leading-relaxed">{pad.notableLaunches.join(' · ')}</div></Section>}
      {pad.info?.length > 0 && <Section title="Notes"><div className="text-xs text-slate-400">{pad.info.join(' · ')}</div></Section>}
      <Section title="Lien"><Chip icon={MapPin} tone="amber" onClick={() => open('spaceport', 'guiana-space-centre-csg')}>Guiana Space Centre (CSG)</Chip></Section>
    </>
  );
}

// ── Company ─────────────────────────────────────────────────────────────────
function CompanyFiche({ c, open }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        {c.flag && <FlagIcon code={c.flag} size="lg" />}
        <div><Badge tone="indigo">{c.type}</Badge></div>
        {c.status === 'withdrawn' && <Badge tone="red">retiré</Badge>}
      </div>
      <p className="text-sm text-slate-300 leading-relaxed mb-3">{c.role}</p>
      {c.products?.length > 0 && <Section title="Produits"><div className="flex flex-wrap gap-1.5">{c.products.map((p) => <Badge key={p} tone="blue">{p}</Badge>)}</div></Section>}
      {c.launchers?.length > 0 && (
        <Section title="Lanceurs">
          <div className="flex flex-wrap gap-1.5">
            {c.launchers.filter((id) => launcherById[id]).map((id) => <Chip key={id} icon={Rocket} onClick={() => open('launcher', id)}>{launcherById[id].name}</Chip>)}
          </div>
        </Section>
      )}
      <div className="panel p-3 mt-3">
        <KeyVal k="Siège" v={`${c.hq?.city || ''} ${c.country ? '· ' + c.country : ''}`} />
        {c.owner && <KeyVal k="Actionnariat" v={c.owner} />}
        {c.elc && <KeyVal k="ESA Launcher Challenge" v="✓ sélectionné" />}
      </div>
    </>
  );
}

// ── Institution ─────────────────────────────────────────────────────────────
function InstitutionFiche({ inst }) {
  const tierLabel = { policy: 'Politique & financement', technical: 'Technique & R&D', exploitation: 'Exploitation & marché', national: 'Agence nationale' }[inst.tier];
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        {inst.flag && <FlagIcon code={inst.flag} size="lg" />}
        <Badge tone="gold">{tierLabel}</Badge>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed mb-3">{inst.role}</p>
      {inst.mandate?.length > 0 && <Section title="Mandat"><ul className="space-y-1">{inst.mandate.map((m) => <li key={m} className="text-xs text-slate-300 flex gap-2"><span className="text-blue-500">▹</span>{m}</li>)}</ul></Section>}
      <div className="panel p-3 mt-3">
        <KeyVal k="Siège" v={`${inst.hq?.city} · ${inst.hq?.country}`} />
        {inst.members && <KeyVal k="Membres" v={inst.members} />}
        {inst.founded && <KeyVal k="Créée" v={inst.founded} />}
      </div>
      {inst.centres?.length > 0 && (
        <Section title="Centres">
          {inst.centres.map((ce) => (
            <div key={ce.name} className="flex justify-between py-1 border-b border-slate-800/70 last:border-0">
              <span className="text-xs text-slate-200 font-semibold">{ce.name}</span>
              <span className="text-[11px] text-slate-500">{ce.city} · {ce.role}</span>
            </div>
          ))}
        </Section>
      )}
    </>
  );
}

// ── Material ────────────────────────────────────────────────────────────────
function MaterialFiche({ m }) {
  return (
    <>
      <Badge tone="indigo">{m.category}</Badge>
      <Section title="Usage spatial"><p className="text-sm text-slate-300">{m.spaceUse}</p></Section>
      <div className="panel p-3 mt-2">
        <KeyVal k="Rôle lanceurs" v={m.launcherRole} />
        <KeyVal k="Rôle satellites" v={m.satelliteRole} />
        <KeyVal k="Réglementation UE" v={m.euRegulation} />
        <KeyVal k="PFAS" v={m.pfas} />
        <KeyVal k="Fournisseurs UE" v={m.suppliers} />
        <KeyVal k="Risque autonomie" v={m.supplierRisk} />
      </div>
      {m.assessment && <Section title="Évaluation"><MultiLine text={m.assessment} /></Section>}
    </>
  );
}

// ── CRM material ──────────────────────────────────────────────────────────────
function CrmStage({ label, items }) {
  if (!items?.length) return null;
  return (
    <div className="mb-2">
      <div className="text-[11px] text-slate-500 mb-1">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-1 panel-raised px-2 py-0.5 rounded-md text-[11px] text-slate-200">
            {s.country && CRM_COUNTRY[s.country] && <FlagIcon code={CRM_COUNTRY[s.country].iso2} size="xs" />}
            {s.country && CRM_COUNTRY[s.country] ? CRM_COUNTRY[s.country].name : (s.country || '—')}
            {s.share && <Badge tone="red">{s.share}%</Badge>}
            {s.note && <span className="text-slate-500">· {s.note}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
function CrmFiche({ m }) {
  const RISK = { critical: { tone: 'red', label: 'Critique' }, high: { tone: 'amber', label: 'Élevé' }, medium: { tone: 'slate', label: 'Modéré' } }[m.riskLevel] || { tone: 'slate', label: m.riskLevel };
  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <Badge tone="indigo">{m.category}</Badge>
        <Badge tone={RISK.tone}>Risque {RISK.label}</Badge>
        {m.crmaListed && <Badge tone="blue">CRMA</Badge>}
        <Confidence level={m.confidence} sources={m.refs} />
      </div>
      <p className="text-sm text-slate-300 leading-relaxed mb-2">{m.strategicRelevance}</p>
      <Section title="Dépendance d'approvisionnement">
        <div className="panel p-3">
          <CrmStage label="Matières premières" items={m.sources?.raw} />
          <CrmStage label="Transformation" items={m.sources?.processed} />
          <CrmStage label="Matériaux avancés" items={m.sources?.advanced} />
          <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">{m.importDependency}</div>
        </div>
      </Section>
      <Section title="Usage spatial">
        <div className="panel p-3">
          <KeyVal k="Rôle lanceurs" v={m.launcherUse} />
          <KeyVal k="Rôle satellites" v={m.satelliteUse} />
          <KeyVal k="Risque appro" v={m.supplyRisk} />
        </div>
      </Section>
    </>
  );
}

// ── Country ─────────────────────────────────────────────────────────────────
function CountryFiche({ c, open }) {
  const TIER = { 'eu-major': 'Grand contributeur UE/ESA', eu: 'État membre UE', 'non-eu': 'Hors UE (membre ESA)', world: 'Puissance mondiale' }[c.tier];
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <FlagIcon code={c.flag} size="xl" />
        <Badge tone="gold">{TIER}</Badge>
      </div>
      <div className="panel p-3 mb-2"><KeyVal k="ESA / budget" v={c.esa} /></div>
      <p className="text-sm text-slate-300 leading-relaxed mb-1"><span className="text-blue-400 font-bold text-[11px] uppercase">Position · </span>{c.position}</p>
      {c.notes && <p className="text-xs text-slate-500 leading-relaxed mb-2">{c.notes}</p>}
      {c.agency && institutionById[c.agency] && <Section title="Agence"><Chip icon={Building2} onClick={() => open('institution', c.agency)}>{institutionById[c.agency].short}</Chip></Section>}
      {c.actors?.length > 0 && (
        <Section title="Acteurs industriels">
          <div className="flex flex-wrap gap-1.5">{c.actors.filter((id) => companyById[id]).map((id) => <Chip key={id} icon={Factory} onClick={() => open('company', id)}>{companyById[id].name}</Chip>)}</div>
        </Section>
      )}
      {c.launchers?.length > 0 && (
        <Section title="Lanceurs">
          <div className="flex flex-wrap gap-1.5">{c.launchers.filter((id) => launcherById[id]).map((id) => <Chip key={id} icon={Rocket} tone="blue" onClick={() => open('launcher', id)}>{launcherById[id].name}</Chip>)}</div>
        </Section>
      )}
      {c.spaceports?.length > 0 && <Section title="Spaceports"><div className="text-xs text-slate-300">{c.spaceports.join(' · ')}</div></Section>}
    </>
  );
}

const TITLES = {
  launcher: (e) => `${e.name}${e.abbreviation ? ` · ${e.abbreviation}` : ''}`,
  spaceport: (e) => e.name, pad: (e) => e.code ? `${e.code} · ${e.name}` : e.name, company: (e) => e.name,
  institution: (e) => e.short || e.name, material: (e) => e.material, crm: (e) => e.name, country: (e) => e.name,
};
const ICONS = { launcher: Rocket, spaceport: MapPin, pad: MapPin, company: Factory, institution: Building2, material: Beaker, crm: Boxes, country: Globe2 };

export default function EntityDrawer() {
  const sel = useAppStore((s) => s.selectedEntity);
  const stack = useAppStore((s) => s.entityStack);
  const open = useAppStore((s) => s.openEntity);
  const back = useAppStore((s) => s.backEntity);
  const close = useAppStore((s) => s.closeEntity);

  const entity = sel ? ({
    launcher: launcherById, spaceport: spaceportById, pad: padById,
    company: companyById, institution: institutionById, country: countryById,
    material: Object.fromEntries(criticalMaterials.map((m) => [m.id, m])),
    crm: crmById,
  }[sel.type]?.[sel.id]) : null;

  const Icon = sel ? ICONS[sel.type] : Rocket;

  return (
    <AnimatePresence>
      {sel && entity && (
        <>
          <motion.div className="fixed inset-0 bg-black/50 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
            <header className="flex items-center gap-2 px-4 h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur flex-shrink-0">
              {stack.length > 0 && (
                <button onClick={back} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400" title="Retour"><ChevronLeft size={18} /></button>
              )}
              <Icon size={16} className="text-blue-400 flex-shrink-0" />
              <h3 className="font-bold text-white text-sm truncate flex-1">{TITLES[sel.type]?.(entity)}</h3>
              <button onClick={close} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"><X size={18} /></button>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
              {sel.type === 'launcher' && <LauncherFiche l={entity} open={open} />}
              {sel.type === 'spaceport' && <SpaceportFiche sp={entity} />}
              {sel.type === 'pad' && <PadFiche pad={entity} open={open} />}
              {sel.type === 'company' && <CompanyFiche c={entity} open={open} />}
              {sel.type === 'institution' && <InstitutionFiche inst={entity} />}
              {sel.type === 'material' && <MaterialFiche m={entity} />}
              {sel.type === 'crm' && <CrmFiche m={entity} />}
              {sel.type === 'country' && <CountryFiche c={entity} open={open} />}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

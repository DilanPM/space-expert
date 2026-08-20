import React from 'react';

// ── Country name → ISO2 flag code (for flag-icons in tables) ────────────────
const FLAGS = {
  france: 'fr', germany: 'de', italy: 'it', spain: 'es', 'united kingdom': 'gb', uk: 'gb',
  'united states': 'us', usa: 'us', china: 'cn', india: 'in', japan: 'jp', russia: 'ru',
  norway: 'no', sweden: 'se', netherlands: 'nl', belgium: 'be', switzerland: 'ch',
  luxembourg: 'lu', ukraine: 'ua', 'south korea': 'kr', korea: 'kr', brazil: 'br',
  israel: 'il', iran: 'ir', 'new zealand': 'nz', nz: 'nz', australia: 'au', canada: 'ca',
  poland: 'pl', portugal: 'pt', austria: 'at', europe: 'eu', eu: 'eu', 'european union': 'eu',
};
export function flagCode(country = '') {
  const first = String(country).split(/[\/,(]/)[0].trim().toLowerCase();
  return FLAGS[first] || (first.includes('europe') ? 'eu' : null);
}

// ── Status tone (launchers / spaceports / programmes) ───────────────────────
export function statusTone(status = '') {
  const s = String(status).toLowerCase();
  if (/(operational|active|orbit reached|fully licensed|in operation)/.test(s)) return 'green';
  if (/(development|dev|under construction|licensed|opening|test|introduction|planned|pending)/.test(s)) return 'amber';
  if (/(cancelled|retired|withdrawn|inactive|suspended|failed|administration)/.test(s)) return 'red';
  if (/(concept|study|proposal|feasibility|tbd)/.test(s)) return 'slate';
  return 'blue';
}

const TONES = {
  green:  'bg-green-500/15 text-green-300 border-green-500/30',
  amber:  'bg-amber-500/15 text-amber-300 border-amber-500/30',
  red:    'bg-red-500/15 text-red-300 border-red-500/30',
  blue:   'bg-blue-500/15 text-blue-300 border-blue-500/30',
  indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  slate:  'bg-slate-600/20 text-slate-300 border-slate-600/40',
  gold:   'bg-amber-400/15 text-amber-200 border-amber-400/30',
};

export function Badge({ tone = 'blue', children, className = '', title }) {
  return (
    <span title={title}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold whitespace-nowrap ${TONES[tone] || TONES.blue} ${className}`}>
      {children}
    </span>
  );
}

export function StatCard({ label, value, unit, sub, icon: Icon, tone = 'blue', onClick }) {
  const accent = { blue: 'text-blue-400', amber: 'text-amber-400', green: 'text-green-400', red: 'text-red-400', indigo: 'text-indigo-400' }[tone] || 'text-blue-400';
  return (
    <button onClick={onClick} disabled={!onClick}
      className={`panel p-4 text-left w-full ${onClick ? 'hover:border-slate-600 transition-colors cursor-pointer' : 'cursor-default'}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{label}</span>
        {Icon && <Icon size={15} className={accent} />}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-2xl font-bold tabular ${accent}`}>{value}</span>
        {unit && <span className="text-xs text-slate-500 font-medium">{unit}</span>}
      </div>
      {sub && <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>}
    </button>
  );
}

export function SectionHeader({ emoji, title, subtitle, right }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          {emoji && <span>{emoji}</span>}{title}
        </h2>
        {subtitle && <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  );
}

export function Pill({ active, children, onClick, tone = 'blue' }) {
  const on = { blue: 'bg-blue-600 text-white border-blue-500', amber: 'bg-amber-500 text-slate-950 border-amber-400' }[tone] || 'bg-blue-600 text-white border-blue-500';
  return (
    <button onClick={onClick}
      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
        active ? on : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white hover:border-slate-600'
      }`}>
      {children}
    </button>
  );
}

export function KeyVal({ k, v, mono }) {
  if (v === null || v === undefined || v === '') return null;
  return (
    <div className="flex justify-between gap-3 py-1.5 border-b border-slate-800/70 last:border-0">
      <span className="text-xs text-slate-500 flex-shrink-0">{k}</span>
      <span className={`text-xs text-slate-200 text-right ${mono ? 'tabular' : ''}`}>{v}</span>
    </div>
  );
}

/** Relational link chip — opens an entity in the drawer on click. */
export function Chip({ children, onClick, tone = 'indigo', icon: Icon }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-medium transition-all hover:brightness-125 ${TONES[tone]}`}>
      {Icon && <Icon size={11} />}{children}
      <span className="opacity-50">→</span>
    </button>
  );
}

export function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="panel p-10 flex flex-col items-center justify-center text-center gap-2">
      {Icon && <Icon size={32} className="text-slate-600" />}
      <div className="text-slate-300 font-semibold">{title}</div>
      {hint && <div className="text-xs text-slate-500 max-w-sm">{hint}</div>}
    </div>
  );
}

/** Clean bullet list — accepts an array (preferred) or a delimited string. */
export function BulletList({ items, text, className = '', tone = 'blue' }) {
  let arr = items ?? text;
  if (!arr) return null;
  if (typeof arr === 'string') {
    arr = arr.split(/\s*[—•·]\s*|\s*;\s+/).map((p) => p.replace(/^[\s—–:-]+/, '').trim()).filter(Boolean);
  }
  if (!Array.isArray(arr) || arr.length === 0) return null;
  if (arr.length === 1) return <p className={`text-sm text-slate-300 leading-relaxed ${className}`}>{arr[0]}</p>;
  const dot = { blue: 'text-blue-500', amber: 'text-amber-500', green: 'text-green-500', red: 'text-red-500' }[tone] || 'text-blue-500';
  return (
    <ul className={`space-y-1 ${className}`}>
      {arr.map((p, i) => (
        <li key={i} className="text-sm text-slate-300 leading-snug flex gap-2">
          <span className={`${dot} mt-0.5 flex-shrink-0`}>▹</span><span>{p}</span>
        </li>
      ))}
    </ul>
  );
}
/** Back-compat alias. */
export const MultiLine = BulletList;

// ── Confidence / source indicator ───────────────────────────────────────────
const CONF = {
  verified:   { label: 'vérifié',    tone: 'green', icon: '✓' },
  internalDB: { label: 'DB interne', tone: 'slate', icon: '~' },
  toConfirm:  { label: 'à confirmer', tone: 'amber', icon: '⚠' },
};
export function Confidence({ level = 'internalDB', sources, className = '' }) {
  const c = CONF[level] || CONF.internalDB;
  const title = level === 'verified'
    ? `Web-vérifié${sources?.length ? ' — sources : ' + sources.join(', ') : ''}`
    : level === 'toConfirm' ? 'À confirmer (placeholder budgétaire / donnée manquante)'
    : 'Issu de ta DB interne (Excel) — non re-vérifié';
  return (
    <Badge tone={c.tone} className={className} title={title}>
      <span className="font-bold">{c.icon}</span>{c.label}{level === 'verified' && sources?.length ? ` · ${sources[0]}` : ''}
    </Badge>
  );
}

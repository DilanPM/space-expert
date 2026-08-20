import React, { useState, useEffect, useRef } from 'react';
import { Rocket } from 'lucide-react';

/**
 * Fetches a thumbnail from Wikimedia/Wikipedia REST by page title, with a
 * styled placeholder fallback. Lazy-loads on viewport entry. Module-level
 * cache dedupes requests across cards.
 */
const cache = new Map(); // query -> url | null

async function fetchThumb(query, size = 480) {
  if (cache.has(query)) return cache.get(query);
  for (const lang of ['fr', 'en']) {
    try {
      const res = await fetch(
        `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
        { signal: AbortSignal.timeout(6000) }
      );
      if (!res.ok) continue;
      const data = await res.json();
      const url = data.originalimage?.source || data.thumbnail?.source;
      if (url) {
        const scaled = url.replace(/\/\d+px-/, `/${size}px-`);
        cache.set(query, scaled);
        return scaled;
      }
    } catch { /* try next lang */ }
  }
  cache.set(query, null);
  return null;
}

export default function SpaceImage({
  query, alt, className = '', icon: Icon = Rocket, contain = false, gradient = 'from-slate-800 to-slate-900',
}) {
  const [url, setUrl] = useState(query ? cache.get(query) ?? undefined : null);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || visible) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { rootMargin: '200px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || !query || url !== undefined) return;
    let alive = true;
    fetchThumb(query).then((u) => { if (alive) setUrl(u); });
    return () => { alive = false; };
  }, [visible, query, url]);

  const showPlaceholder = url === null || url === undefined && (!query || !visible);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      {url ? (
        <img
          src={url} alt={alt || query}
          loading="lazy"
          className={`w-full h-full ${contain ? 'object-contain p-2' : 'object-cover'}`}
          onError={() => { cache.set(query, null); setUrl(null); }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center grid-bg">
          <Icon className="text-slate-600" size={36} strokeWidth={1.3} />
          {url === undefined && visible && (
            <span className="absolute bottom-1 right-2 text-[9px] text-slate-600 animate-pulse">…</span>
          )}
        </div>
      )}
    </div>
  );
}

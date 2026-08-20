import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

/**
 * Shared flat world map (geoNaturalEarth1) — single source of map styling so
 * every map in the app looks identical. Markers are passed as children.
 *
 *  countryFiche(geo) -> fiche | null   → makes that country clickable/highlit
 *  onCountryClick(fiche) / onCountryHover(fiche|null, evt)
 *  fillFor(geo) -> color | null        → choropleth : couleur de remplissage custom
 *  hoverFillFor(geo) -> color | null   → couleur au survol (défaut = fillFor éclairci)
 */
export default function WorldMap({
  center = [15, 30], zoom = 1.4, minZoom = 1, maxZoom = 140, onMoveEnd, height = '68vh',
  scale = 170, countryFiche, onCountryClick, onCountryHover, fillFor, hoverFillFor, children,
}) {
  return (
    <ComposableMap projection="geoNaturalEarth1" projectionConfig={{ scale }} style={{ width: '100%', height }}>
      <ZoomableGroup center={center} zoom={zoom} minZoom={minZoom} maxZoom={maxZoom} onMoveEnd={onMoveEnd}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map((geo) => {
            const fiche = countryFiche ? countryFiche(geo) : null;
            const custom = fillFor ? fillFor(geo) : null;
            const baseFill = custom || (fiche ? '#27508a' : '#1e3a5f');
            const hoverFill = (hoverFillFor && hoverFillFor(geo)) || custom || (fiche ? '#3b6bb0' : '#274b78');
            return (
              <Geography key={geo.rsmKey} geography={geo}
                fill={baseFill} stroke="#0b1f38" strokeWidth={0.4}
                onClick={fiche && onCountryClick ? () => onCountryClick(fiche) : undefined}
                onMouseEnter={fiche && onCountryHover ? (e) => onCountryHover(fiche, e) : undefined}
                onMouseMove={fiche && onCountryHover ? (e) => onCountryHover(fiche, e) : undefined}
                onMouseLeave={fiche && onCountryHover ? () => onCountryHover(null) : undefined}
                style={{
                  default: { outline: 'none', cursor: fiche ? 'pointer' : 'default' },
                  hover: { fill: hoverFill, outline: 'none' },
                  pressed: { outline: 'none' },
                }} />
            );
          })}
        </Geographies>
        {children}
      </ZoomableGroup>
    </ComposableMap>
  );
}

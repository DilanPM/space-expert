import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Global app state.
 *  - viewMode          : active module (see NAV in App.jsx)
 *  - selectedEntity    : { type, id } currently open in the side drawer
 *  - entityStack       : breadcrumb history enabling cross-link back navigation
 *  - launcherFilters   : filters for the Launchers DB
 *  - mapLayers         : toggled layers on the strategic map
 *  - compare           : launcher ids selected in the comparator
 */
export const useAppStore = create(
  persist(
    (set, get) => ({
      // ── Navigation ───────────────────────────────────────────────
      viewMode: 'home',
      setViewMode: (mode) => set({ viewMode: mode, selectedEntity: null, entityStack: [] }),
      sidebarCollapsed: false,
      toggleSidebar: () => set((st) => ({ sidebarCollapsed: !st.sidebarCollapsed })),

      // ── Entity drawer (cross-linked fiches) ──────────────────────
      selectedEntity: null,        // { type, id }
      entityStack: [],
      openEntity: (type, id) => {
        const cur = get().selectedEntity;
        const stack = cur ? [...get().entityStack, cur] : get().entityStack;
        set({ selectedEntity: { type, id }, entityStack: stack });
      },
      backEntity: () => {
        const stack = [...get().entityStack];
        const prev = stack.pop();
        set({ selectedEntity: prev || null, entityStack: stack });
      },
      closeEntity: () => set({ selectedEntity: null, entityStack: [] }),

      // ── Global search (Ctrl-K palette) ───────────────────────────
      searchOpen: false,
      setSearchOpen: (v) => set({ searchOpen: v }),
      // ── Launcher in-module filter-search ─────────────────────────
      search: '',
      setSearch: (q) => set({ search: q }),

      // ── Launchers filters ────────────────────────────────────────
      launcherView: 'table',  // 'table' | 'cards'
      setLauncherView: (v) => set({ launcherView: v }),
      launcherFilters: {
        scope: 'eu',          // 'eu' | 'world' | 'all'
        category: 'all',      // Micro / Small / Medium / Heavy / Super heavy
        status: 'all',        // 'active' | 'dev' | 'retired' | 'all'
        propellant: 'all',    // 'solid' | 'liquid' | 'cryo' | 'methane' | 'all'
        reusable: 'all',      // 'all' | 'reusable'
        trl: 'all',           // 'all' | '3-9' | '7-9'
        verified: 'all',      // 'all' | 'verified'
        sort: 'capLEO',
      },
      setLauncherFilter: (k, v) =>
        set((st) => ({ launcherFilters: { ...st.launcherFilters, [k]: v } })),

      // ── Comparator ───────────────────────────────────────────────
      compare: [],
      toggleCompare: (id) =>
        set((st) => ({
          compare: st.compare.includes(id)
            ? st.compare.filter((x) => x !== id)
            : st.compare.length < 4
              ? [...st.compare, id]
              : st.compare,
        })),
      clearCompare: () => set({ compare: [] }),

      // ── Strategic map layers ─────────────────────────────────────
      mapLayers: {
        spaceports: true,
        testCentres: true,
        institutions: true,
        manufacturers: true,
      },
      toggleLayer: (k) =>
        set((st) => ({ mapLayers: { ...st.mapLayers, [k]: !st.mapLayers[k] } })),
    }),
    {
      name: 'space-expert',
      version: 2, // bump → discards stale v0.1 persisted filters (new shape: trl/verified/view)
      partialize: (st) => ({
        launcherFilters: st.launcherFilters,
        launcherView: st.launcherView,
        mapLayers: st.mapLayers,
        sidebarCollapsed: st.sidebarCollapsed,
      }),
    }
  )
);

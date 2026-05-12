"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const REGION_COLORS = {
  Europe:   { fill: "#6366f1", hover: "#818cf8", label: "Europe" },
  Asia:     { fill: "#10b981", hover: "#34d399", label: "Asia" },
  Africa:   { fill: "#f59e0b", hover: "#fbbf24", label: "Africa" },
  Americas: { fill: "#ef4444", hover: "#f87171", label: "Americas" },
  Oceania:  { fill: "#a855f7", hover: "#c084fc", label: "Oceania" },
};

const DEFAULT_COLOR = "#1e293b";
const DEFAULT_STROKE = "#0f172a";

export default function WorldMap() {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgContainerRef = useRef(null);
  const countryCacheRef = useRef({});     // name.lower → { region }
  const pathColorMapRef = useRef({});     // normalized-name → region
  const svgLoadedRef = useRef(false);

  /* ── 1. Load country→region data ── */
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,region,altSpellings")
      .then(r => r.json())
      .then(data => {
        data.forEach(c => {
          const key = c.name.common.toLowerCase();
          countryCacheRef.current[key] = c.region;
          // also index official name and alt spellings
          if (c.name.official) {
            countryCacheRef.current[c.name.official.toLowerCase()] = c.region;
          }
        });
        if (svgLoadedRef.current) applyColors();
      })
      .catch(console.error);
  }, []);

  /* ── 2. Inline the SVG from the HTML file ── */
  useEffect(() => {
    // The SVG is already embedded in index.html — we parse it out
    // For Next.js we fetch the static file from public/
    fetch("/world.svg")
      .then(r => {
        if (!r.ok) throw new Error("SVG not found — copy the <svg> from index.html to public/world.svg");
        return r.text();
      })
      .then(text => {
        if (!svgContainerRef.current) return;
        svgContainerRef.current.innerHTML = text;
        svgLoadedRef.current = true;
        styleAllPaths();
        if (Object.keys(countryCacheRef.current).length > 0) applyColors();
      })
      .catch(err => {
        // fallback: if no world.svg, the user sees the container raw
        console.warn(err.message);
        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML =
            `<div style="color:#64748b;padding:2rem;text-align:center;">
              Place your world SVG at <code>public/world.svg</code>
            </div>`;
        }
      });
  }, []);

  /* ── helpers ── */
  function getName(path) {
    return (
      path.getAttribute("name") ||
      path.getAttribute("title") ||
      path.getAttribute("id") ||
      path.getAttribute("class") ||
      ""
    );
  }

  function styleAllPaths() {
    const svg = svgContainerRef.current?.querySelector("svg");
    if (!svg) return;
    svg.style.cssText = "width:100%;height:100%;display:block;";
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    svg.querySelectorAll("path").forEach(p => {
      p.style.fill = DEFAULT_COLOR;
      p.style.stroke = DEFAULT_STROKE;
      p.style.strokeWidth = "0.3";
      p.style.cursor = "pointer";
      p.style.transition = "fill 0.18s ease";
    });
  }

  function applyColors() {
    const svg = svgContainerRef.current?.querySelector("svg");
    if (!svg) return;
    svg.querySelectorAll("path").forEach(p => {
      const raw = getName(p).toLowerCase().trim();
      const region = countryCacheRef.current[raw];
      const color = region ? (REGION_COLORS[region]?.fill ?? DEFAULT_COLOR) : DEFAULT_COLOR;
      p.style.fill = color;
      pathColorMapRef.current[raw] = region || null;
    });
  }

  /* ── 3. Interaction ── */
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    let raf;

    function onMove(e) {
      raf && cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    }

    function onOver(e) {
      const path = e.target.closest("path");
      if (!path) return;
      const name = getName(path);
      if (!name) return;

      setHoveredCountry(name);
      const region = pathColorMapRef.current[name.toLowerCase()] || null;
      const hoverColor = region ? (REGION_COLORS[region]?.hover ?? "#38bdf8") : "#38bdf8";

      // highlight all paths with same name (multi-part countries)
      container.querySelectorAll("path").forEach(p => {
        if (getName(p) === name) p.style.fill = hoverColor;
      });
    }

    function onOut(e) {
      const path = e.target.closest("path");
      if (!path) return;
      const name = getName(path);
      if (!name) return;

      setHoveredCountry(null);
      const region = pathColorMapRef.current[name.toLowerCase()] || null;
      const baseColor = region ? (REGION_COLORS[region]?.fill ?? DEFAULT_COLOR) : DEFAULT_COLOR;

      container.querySelectorAll("path").forEach(p => {
        if (getName(p) === name) p.style.fill = baseColor;
      });
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseover", onOver);
    container.addEventListener("mouseout",  onOut);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseover", onOver);
      container.removeEventListener("mouseout",  onOut);
      raf && cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <h2 style={S.title}>World of Philosophy</h2>
          <p style={S.subtitle}>Birthplaces of great minds, colored by region</p>
        </div>

        {/* Legend */}
        <div style={S.legend}>
          {Object.entries(REGION_COLORS).map(([region, { fill, label }]) => (
            <div key={region} style={S.legendItem}>
              <div style={{ ...S.swatch, background: fill }} />
              <span style={S.legendLabel}>{label}</span>
            </div>
          ))}
          <div style={S.legendItem}>
            <div style={{ ...S.swatch, background: DEFAULT_COLOR, border: "1px solid #334155" }} />
            <span style={S.legendLabel}>Unknown</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={S.mapOuter}>
        <div
          ref={svgContainerRef}
          style={S.mapInner}
        />
      </div>

      {/* Tooltip */}
      {hoveredCountry && (
        <div
          style={{
            ...S.tooltip,
            left: mousePos.x + 16,
            top: mousePos.y - 40,
          }}
        >
          {hoveredCountry}
        </div>
      )}
    </div>
  );
}

/* ── Styles ── */
const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #020617 0%, #0c1a2e 50%, #0f172a 100%)",
    color: "#e2e8f0",
    fontFamily: "'IM Fell English', serif",
    padding: "1.5rem 1.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
    borderBottom: "1px solid rgba(251,191,36,0.15)",
    paddingBottom: "1.25rem",
  },
  title: {
    margin: 0,
    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
    fontWeight: 400,
    background: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1.1,
  },
  subtitle: {
    margin: "0.35rem 0 0",
    fontSize: "0.9rem",
    fontStyle: "italic",
    color: "#64748b",
    fontFamily: "system-ui, sans-serif",
  },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem 1.1rem",
    alignItems: "center",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  swatch: {
    width: 14,
    height: 14,
    borderRadius: 3,
    flexShrink: 0,
  },
  legendLabel: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    fontFamily: "system-ui, sans-serif",
    letterSpacing: "0.04em",
  },
  mapOuter: {
    flex: 1,
    minHeight: 0,
    background: "rgba(15,23,42,0.7)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  mapInner: {
    width: "100%",
    height: "calc(100vh - 180px)",
    minHeight: 400,
  },
  tooltip: {
    position: "fixed",
    background: "rgba(15,23,42,0.95)",
    border: "1px solid rgba(251,191,36,0.3)",
    color: "#fde68a",
    padding: "6px 12px",
    borderRadius: 6,
    fontSize: "0.85rem",
    fontFamily: "system-ui, sans-serif",
    fontWeight: 600,
    pointerEvents: "none",
    zIndex: 9999,
    backdropFilter: "blur(8px)",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  },
};
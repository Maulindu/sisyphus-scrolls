"use client";
import { useEffect, useRef, useState } from "react";

const REGION_COLORS = {
  Europe: "#3b82f6",
  Asia: "#22c55e",
  Africa: "#f59e0b",
  Americas: "#ef4444",
  Oceania: "#a855f7",
};

export default function WorldMap() {
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [hovered, setHovered] = useState(null);
  const svgContainerRef = useRef(null);
  const countryCacheRef = useRef({});
  const countriesReadyRef = useRef(false);

  /* ------------- LOAD COUNTRY DATA ONCE ---------- */
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,region")
      .then(res => res.json())
      .then(data => {
        data.forEach(c => {
          countryCacheRef.current[c.name.common.toLowerCase()] = c;
        });
        countriesReadyRef.current = true;
        // Trigger re-coloring if SVG is already loaded
        if (svgLoaded) {
          applyRegionColors();
        }
      })
      .catch(err => console.error("Failed to load country data:", err));
  }, [svgLoaded]);

  /* ------------------ LOAD SVG ------------------ */
  useEffect(() => {
    fetch("/world.svg")
      .then(res => res.text())
      .then(svgText => {
        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgText;
          setSvgLoaded(true);
        }
      })
      .catch(err => {
        console.error("Failed to load SVG:", err);
      });
  }, []);

  /* ----------------- HELPERS ----------------- */
  function getCountryName(path) {
    const id = path.getAttribute("id");
    const title = path.getAttribute("title");
    const name = path.getAttribute("name");
    const className = path.getAttribute("class");
    
    return title || name || id || className || null;
  }

  function applyRegionColors() {
    const svgEl = svgContainerRef.current?.querySelector("svg");
    if (!svgEl || !countriesReadyRef.current) return;

    const paths = Array.from(svgEl.querySelectorAll("path"));
    
    paths.forEach(path => {
      const name = getCountryName(path);
      if (!name) return;
      
      const country = countryCacheRef.current[name.toLowerCase()];
      path.style.fill = REGION_COLORS[country?.region] || "#334155";
      path.style.stroke = "#020617";
      path.style.strokeWidth = "0.5";
      path.style.cursor = "pointer";
      path.style.transition = "fill 0.2s ease";
    });
  }

  /* ------------- SVG INTERACTION LOGIC ------------ */
  useEffect(() => {
    if (!svgLoaded) return;

    const svgEl = svgContainerRef.current?.querySelector("svg");
    if (!svgEl) return;

    svgEl.style.width = "100%";
    svgEl.style.height = "100%";
    svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // Apply initial colors if country data is ready
    if (countriesReadyRef.current) {
      applyRegionColors();
    }

    const paths = Array.from(svgEl.querySelectorAll("path"));

    /* ---- HOVER HANDLERS ---- */
    function handleMouseOver(e) {
      if (e.target.tagName !== "path") return;
      const name = getCountryName(e.target);
      if (!name) return;

      setHovered(name);
      
      paths.forEach(p => {
        if (getCountryName(p) === name) {
          p.style.fill = "#38bdf8";
        }
      });
    }

    function handleMouseOut(e) {
      if (e.target.tagName !== "path") return;
      const name = getCountryName(e.target);
      if (!name) return;

      setHovered(null);
      
      const country = countryCacheRef.current[name.toLowerCase()];
      const color = REGION_COLORS[country?.region] || "#334155";
      
      paths.forEach(p => {
        if (getCountryName(p) === name) {
          p.style.fill = color;
        }
      });
    }

    svgEl.addEventListener("mouseover", handleMouseOver);
    svgEl.addEventListener("mouseout", handleMouseOut);

    return () => {
      svgEl.removeEventListener("mouseover", handleMouseOver);
      svgEl.removeEventListener("mouseout", handleMouseOut);
    };
  }, [svgLoaded]);

  /* ------------------- RENDER ------------------- */
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Interactive World Map 🌍</h2>
        {hovered && (
          <div style={styles.tooltip}>{hovered}</div>
        )}
      </div>

      <div style={styles.legend}>
        {Object.entries(REGION_COLORS).map(([region, color]) => (
          <div key={region} style={styles.legendItem}>
            <div style={{ ...styles.colorBox, backgroundColor: color }} />
            <span>{region}</span>
          </div>
        ))}
      </div>

      <div
        ref={svgContainerRef}
        style={styles.mapWrapper}
      />

      {!svgLoaded && (
        <div style={styles.loading}>Loading map...</div>
      )}
    </div>
  );
}

/* ------------------- STYLES ------------------- */
const styles = {
  page: {
    background: "linear-gradient(135deg, #020617 0%, #0c4a6e 100%)",
    color: "white",
    minHeight: "100vh",
    padding: "2rem 1rem",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
    position: "relative",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: "700",
  },
  mapWrapper: {
    width: "100%",
    maxWidth: "1200px",
    height: "70vh",
    margin: "0 auto",
    background: "rgba(15, 23, 42, 0.5)",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  },
  tooltip: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#0f172a",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    pointerEvents: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    border: "1px solid #1e293b",
    zIndex: 1000,
  },
  legend: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1.5rem",
    padding: "1rem",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
  },
  colorBox: {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "1.2rem",
    opacity: 0.7,
  },
};
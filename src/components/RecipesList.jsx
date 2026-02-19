import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { Card } from "../Card.jsx";
import Badge from "../Badge.jsx";
import { SearchBar } from "../SearchBar.jsx";
import { useLocalStorage } from "../useLocalStorage.js";

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const [fav, setFav] = useLocalStorage("fav_recipes", []);

  useEffect(() => {
    let mounted = true;
    api.recipes()
      .then((data) => mounted && setRecipes(data))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const allTags = useMemo(() => {
    const set = new Set();
    recipes.forEach(r => r.tags.forEach(t => set.add(t)));
    return ["all", ...Array.from(set).sort()];
  }, [recipes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      const matchesTag = activeTag === "all" || r.tags.includes(activeTag);
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.problem.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [recipes, query, activeTag]);

  const toggleFav = (id) => {
    setFav((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  if (loading) return <div>Carregant receptes...</div>;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Laravel</h1>
      <div style={{ color: "#6b7280" }}>
        Receptes pràctiques amb tags, passos i fragments de codi.
      </div>

      <Card>
        <div style={{ display: "grid", gap: 10 }}>
          <SearchBar value={query} onChange={setQuery} placeholder="Cerca per títol, problema, tag…" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  ...tagBtn,
                  borderColor: activeTag === tag ? "#111827" : "#e5e7eb",
                  fontWeight: activeTag === tag ? 900 : 700
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            Resultats: {filtered.length} / {recipes.length}
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map((r) => (
          <Card key={r.id}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div>
                <Link to={`/receptes/${r.id}`} style={{ fontWeight: 900, color: "#111827" }}>
                  {r.title}
                </Link>
                <div style={{ color: "#374151", marginTop: 6 }}>{r.problem}</div>
              </div>

              <button onClick={() => toggleFav(r.id)} style={miniBtn}>
                {fav.includes(r.id) ? "★ Favorit" : "☆ Afegir"}
              </button>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {r.tags.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const tagBtn = {
    borderRadius: 999,
    border: "1px solid #d1d5db",
    background: "#f3f4f6",
    color: "#111827",      
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: 600
  };
  
const miniBtn = {
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "white",
  padding: "8px 10px",
  cursor: "pointer",
  fontWeight: 700
};

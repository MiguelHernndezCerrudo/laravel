import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { Card } from "../Card.jsx";
import Badge from "../Badge.jsx";
import { useLocalStorage } from "../useLocalStorage.js";

export default function GuideList() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useLocalStorage("fav_topics", []);

  useEffect(() => {
    let mounted = true;
    api.topics()
      .then((data) => mounted && setTopics(data))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const toggleFav = (slug) => {
    setFav((prev) => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  };

  if (loading) return <div>Carregant temes...</div>;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Guia Laravel</h1>
      <div style={{ color: "#6b7280" }}>
        Contingut tipus documentació (no màrqueting). Clica un tema per veure detalls i micro-exemples.
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {topics.map((t) => (
          <Card key={t.slug}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div>
                <Link to={`/guia/${t.slug}`} style={{ fontWeight: 800, color: "#111827" }}>
                  {t.title}
                </Link>
                <div style={{ color: "#374151", marginTop: 6 }}>{t.summary}</div>
              </div>

              <button onClick={() => toggleFav(t.slug)} style={miniBtn}>
                {fav.includes(t.slug) ? "★ Favorit" : "☆ Afegir"}
              </button>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge>slug: {t.slug}</Badge>
              <Badge>micro-exemples: {t.microExamples?.length ?? 0}</Badge>
              <Badge>bones pràctiques: {t.bestPractices?.length ?? 0}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const miniBtn = {
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "white",
  color: "#111827",
  padding: "8px 10px",
  cursor: "pointer",
  fontWeight: 700
};

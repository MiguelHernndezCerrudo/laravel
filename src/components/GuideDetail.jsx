import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api.js";
import { Card } from "../Card.jsx";
import { useLocalStorage } from "../useLocalStorage.js";

export default function GuideDetail() {
  const { slug } = useParams();
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

  const topic = useMemo(() => topics.find(t => t.slug === slug), [topics, slug]);

  const toggleFav = () => {
    setFav((prev) => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  };

  if (loading) return <div>Carregant...</div>;
  if (!topic) {
    return (
      <Card>
        <h2>Tema no trobat</h2>
        <Link to="/guia">Tornar a la guia</Link>
      </Card>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <Link to="/guia">← Guia</Link>
          <h1 style={{ margin: "6px 0 0 0" }}>{topic.title}</h1>
          <div style={{ color: "#374151" }}>{topic.whyItMatters}</div>
        </div>
        <button onClick={toggleFav} style={btn}>
          {fav.includes(slug) ? "★ Guardat" : "☆ Guardar"}
        </button>
      </div>

      <Card>
        <h3 style={{ marginTop: 0 }}>Micro-exemples</h3>
        <div style={{ display: "grid", gap: 12 }}>
          {topic.microExamples.map((ex, i) => (
            <div key={i}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{ex.title}</div>
              <pre style={pre}><code>{ex.code}</code></pre>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Bones pràctiques</h3>
        <ul style={{ margin: 0 }}>
          {topic.bestPractices.map((bp, i) => <li key={i}>{bp}</li>)}
        </ul>
      </Card>
    </div>
  );
}

const btn = {
  borderRadius: 10,
  border: "1px solid #111827",
  background: "white",
  padding: "10px 12px",
  cursor: "pointer",
  fontWeight: 800
};

const pre = {
  margin: 0,
  background: "#0b1020",
  color: "white",
  padding: 12,
  borderRadius: 12,
  overflowX: "auto"
};

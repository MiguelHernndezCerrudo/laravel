import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api.js";
import { Card } from "../Card.jsx";
import Badge from "../Badge.jsx";
import { useLocalStorage } from "../useLocalStorage.js";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useLocalStorage("fav_recipes", []);

  useEffect(() => {
    let mounted = true;
    api.recipes()
      .then((data) => mounted && setRecipes(data))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const recipe = useMemo(() => recipes.find(r => r.id === id), [recipes, id]);

  const toggleFav = () => {
    setFav((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  if (loading) return <div>Carregant...</div>;
  if (!recipe) {
    return (
      <Card>
        <h2>Recepta no trobada</h2>
        <Link to="/receptes">Tornar a receptes</Link>
      </Card>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <Link to="/receptes"> Receptes</Link>
          <h1 style={{ margin: "6px 0 0 0" }}>{recipe.title}</h1>
          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {recipe.tags.map(t => <Badge key={t}>{t}</Badge>)}
          </div>
        </div>
        <button onClick={toggleFav} style={btn}>
          {fav.includes(id) ? "★ Guardada" : "☆ Guardar"}
        </button>
      </div>

      <Card>
        <h3 style={{ marginTop: 0 }}>Problema</h3>
        <div style={{ color: "#374151" }}>{recipe.problem}</div>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Passos</h3>
        <ol style={{ margin: 0 }}>
          {recipe.steps.map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}
        </ol>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Fragments de codi</h3>
        <div style={{ display: "grid", gap: 12 }}>
          {recipe.codeBlocks.map((b, i) => (
            <div key={i}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>{b.label}</div>
              <pre style={pre}><code>{b.code}</code></pre>
            </div>
          ))}
        </div>
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

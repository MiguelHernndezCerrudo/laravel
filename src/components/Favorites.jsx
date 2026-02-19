import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { Card } from "../Card.jsx";
import Badge from "../Badge.jsx";
import { useLocalStorage } from "../useLocalStorage.js";

export default function Favorites() {
  const [favTopics, setFavTopics] = useLocalStorage("fav_topics", []);
  const [favRecipes, setFavRecipes] = useLocalStorage("fav_recipes", []);

  const [topics, setTopics] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([api.topics(), api.recipes()])
      .then(([t, r]) => {
        if (!mounted) return;
        setTopics(t);
        setRecipes(r);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const favTopicItems = useMemo(
    () => topics.filter(t => favTopics.includes(t.slug)),
    [topics, favTopics]
  );

  const favRecipeItems = useMemo(
    () => recipes.filter(r => favRecipes.includes(r.id)),
    [recipes, favRecipes]
  );

  const clearAll = () => {
    setFavTopics([]);
    setFavRecipes([]);
  };

  if (loading) return <div>Carregant favorits...</div>;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Favorits</h1>
          <div style={{ color: "#6b7280" }}>
            Guarda temes i receptes per repassar-los més tard (persistit a localStorage).
          </div>
        </div>
        <button onClick={clearAll} style={dangerBtn}>Esborrar-ho tot</button>
      </div>

      <Card>
        <h3 style={{ marginTop: 0 }}>Temes ({favTopicItems.length})</h3>
        {favTopicItems.length === 0 ? (
          <div style={{ color: "#6b7280" }}>Cap tema guardat.</div>
        ) : (
          <ul style={{ margin: 0 }}>
            {favTopicItems.map(t => (
              <li key={t.slug}>
                <Link to={`/guia/${t.slug}`}>{t.title}</Link>{" "}
                <Badge>{t.slug}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Receptes ({favRecipeItems.length})</h3>
        {favRecipeItems.length === 0 ? (
          <div style={{ color: "#6b7280" }}>Cap recepta guardada.</div>
        ) : (
          <ul style={{ margin: 0 }}>
            {favRecipeItems.map(r => (
              <li key={r.id}>
                <Link to={`/receptes/${r.id}`}>{r.title}</Link>{" "}
                <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
                  {r.tags.slice(0, 3).map(t => <Badge key={t}>{t}</Badge>)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

const dangerBtn = {
  borderRadius: 10,
  border: "1px solid #ef4444",
  background: "white",
  padding: "10px 12px",
  cursor: "pointer",
  fontWeight: 800
};

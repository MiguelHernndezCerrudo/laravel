import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { Card } from "../Card.jsx";
import Badge from "../Badge.jsx";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.projects()
      .then((data) => mounted && setProjects(data))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Carregant projectes...</div>;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>Projectes tipus Laravel</h1>
      <div style={{ color: "#6b7280" }}>
        Showcase realista del que un client podria demanar, i quines peces de Laravel hi intervenen.
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {projects.map((p) => (
          <Card key={p.id}>
            <Link to={`/projectes/${p.id}`} style={{ fontWeight: 900, color: "#111827" }}>
              {p.title}
            </Link>
            <div style={{ color: "#374151", marginTop: 6 }}>{p.goal}</div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge>Dificultat: {p.difficulty}</Badge>
              <Badge>Mòduls: {p.laravelModules.length}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

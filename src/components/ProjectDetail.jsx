import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api.js";
import { Card } from "../Card.jsx";
import Badge from "../Badge.jsx";

export default function ProjectDetail() {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.projects()
      .then((data) => mounted && setProjects(data))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const project = useMemo(() => projects.find(p => p.id === id), [projects, id]);

  if (loading) return <div>Carregant...</div>;
  if (!project) {
    return (
      <Card>
        <h2>Projecte no trobat</h2>
        <Link to="/projectes">Tornar a projectes</Link>
      </Card>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <Link to="/projectes">← Projectes</Link>
        <h1 style={{ margin: "6px 0 0 0" }}>{project.title}</h1>
        <div style={{ color: "#374151", marginTop: 6 }}>{project.goal}</div>
      </div>

      <Card>
        <h3 style={{ marginTop: 0 }}>Fitxa tècnica</h3>
        <div style={{ display: "grid", gap: 8 }}>
          <div><b>Stack:</b> {project.stack}</div>
          <div><b>Dificultat:</b> {project.difficulty}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {project.laravelModules.map(m => <Badge key={m}>{m}</Badge>)}
          </div>
        </div>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Entregables típics</h3>
        <ul style={{ margin: 0 }}>
          {project.deliverables.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </Card>
    </div>
  );
}

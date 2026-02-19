import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";

export default function Layout() {
  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: 20 }}>
      <header style={{ display: "grid", gap: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Laravel</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              Guia + Receptes + Projectes
            </div>
          </div>
          <Nav />
        </div>
      </header>

      <main style={{ display: "grid", gap: 14 }}>
        <Outlet />
      </main>
    </div>
  );
}

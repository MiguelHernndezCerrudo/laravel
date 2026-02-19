import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: isActive ? "#f3f4f6" : "white",
  color: "#111827",
  fontSize: 14,
});

export default function Nav() {
  return (
    <nav style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/guia" style={linkStyle}>Guia</NavLink>
      <NavLink to="/receptes" style={linkStyle}>Receptes</NavLink>
      <NavLink to="/projectes" style={linkStyle}>Projectes</NavLink>
      <NavLink to="/favorits" style={linkStyle}>Favorits</NavLink>
    </nav>
  );
}

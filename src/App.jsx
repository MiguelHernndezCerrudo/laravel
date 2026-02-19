import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./assets/Layout.jsx";

import Home from "./components/Home.jsx";

import GuideList from "./components/GuideList.jsx";
import GuideDetail from "./components/GuideDetail.jsx";

import RecipesList from "./components/RecipesList.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";

import ProjectsList from "./components/ProjectsList.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

import Favorites from "./components/Favorites.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/guia" element={<GuideList />} />
        <Route path="/guia/:slug" element={<GuideDetail />} />

        <Route path="/receptes" element={<RecipesList />} />
        <Route path="/receptes/:id" element={<RecipeDetail />} />

        <Route path="/projectes" element={<ProjectsList />} />
        <Route path="/projectes/:id" element={<ProjectDetail />} />

        <Route path="/favorits" element={<Favorites />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

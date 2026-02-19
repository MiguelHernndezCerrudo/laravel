const base = import.meta.env.BASE_URL;

export async function fetchJSON(path) {
  const url = `${base}${path.replace(/^\//, "")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No s'ha pogut carregar: ${url} (${res.status})`);
  return res.json();
}

export const api = {
  topics: () => fetchJSON("/data/topics.json"),
  recipes: () => fetchJSON("/data/recipes.json"),
  projects: () => fetchJSON("/data/projects.json"),
};

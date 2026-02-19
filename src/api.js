export async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`No s'ha pogut carregar: ${path}`);
    return res.json();
  }
  
  export const api = {
    topics: () => fetchJSON("/data/topics.json"),
    recipes: () => fetchJSON("/data/recipes.json"),
    projects: () => fetchJSON("/data/projects.json"),
  };
  
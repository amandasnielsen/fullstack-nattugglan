export async function fetchMenuData() {
    const res = await fetch("http://localhost:3000/menu");
    return res.json();
  }
  
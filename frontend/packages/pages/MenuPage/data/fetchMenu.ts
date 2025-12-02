export async function fetchMenuData() {
	const res = await fetch('http://localhost:3000/api/menu');
	return res.json();
}

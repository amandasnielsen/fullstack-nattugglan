export function validateName(name: string): boolean {
	if (!name) return false;

	const nameRegex = /^[A-Za-zÅÄÖåäö\- ]{2,}$/;

	return nameRegex.test(name.trim());
}

export function validatePhone(phone: string): boolean {
	if (!phone) return false;

	const cleaned = phone.replace(/\s+/g, '');
	const phoneRegex = /^\+?[0-9]{7,15}$/;

	return phoneRegex.test(cleaned);
}

export default class RestoService {
	constructor() {
		this.baseUrl = 'http://localhost:3000/menu';
	}

	async getResources() {
		const res = await fetch('http://localhost:3000/menu')

		if (!res.ok) {
			throw new Error(`Could not fetch: ${this.baseUrl}, recieve: ${res.status}`)
		}

		return await res.json();
	}

	getMenuItems = async () => {
		const res = await this.getResources()
		return res;
	}
};

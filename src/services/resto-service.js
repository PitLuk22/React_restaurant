export default class RestoService {
	constructor() {
		this.baseUrl = 'http://localhost:3000';
	}

	async getResources(url) {
		const res = await fetch(`${this.baseUrl}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch: ${this.baseUrl}, recieve: ${res.status}`);
		}

		return await res.json();
	}

	async getMenuItems() {
		return await this.getResources('/menu');
	}
	async getOneItem(itemId) {
		const menu = await this.getResources('/menu');
		let res;
		menu.forEach(item => {
			if (+item.id === +itemId) {
				res = item
			}
		});
		return res;
	}

	async postData(data, totalBill) {
		const number = await this.getOrderNumber();
		const newOrder = {
			id: number,
			order: data,
			total: totalBill
		}
		let res = await fetch(`${this.baseUrl}/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(newOrder)
		});
		if (!res.ok) {
			throw Error('Something went wrong!');
		}
	};

	// define next 'id' in db.json
	async getOrderNumber() {
		const res = await this.getResources('/orders/');
		const orderNumber = res.length + 1;

		return orderNumber
	}
};

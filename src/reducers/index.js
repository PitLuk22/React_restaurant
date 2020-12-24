const initialState = {
	menu: [],
	loading: true,
	error: false,
	cart: [],
	total: 0
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'MENU_LOADED':
			return {
				...state,
				menu: action.payload,
				loading: false,
				error: false
			}
		case 'MENU_REQUESTED':
			return {
				...state,
				menu: state.menu, // получение предыдущего стейта (если этого не сделать, то state.menu удалится)
				loading: true,
				error: false
			}
		case 'MENU_ERROR':
			return {
				...state,
				menu: state.menu,
				loading: false,
				error: true
			}
		case 'ADD_ITEM_TO_CARD':
			const id = action.payload; // id of new product
			const itemToAdd = state.menu.filter(el => +el.id === +id)[0]; // new product
			const incTotal = state.total + itemToAdd.price;
			const newItem = {
				title: itemToAdd.title,
				price: itemToAdd.price,
				url: itemToAdd.url,
				id: itemToAdd.id,
				count: 1
			}
			const prev = state.cart.find(item => item.id === id); // old product (if exist)

			// if we have already had product like new one
			if (prev) {
				newItem.count += prev.count;
				newItem.price += prev.price;
			}

			// if current product is new 
			if (newItem.count === 1) {
				return {
					...state,
					cart: [
						...state.cart,
						newItem
					],
					total: incTotal
				}
				// if current product has duplicate
			} else {
				const indexOfPrevItem = state.cart.findIndex(item => item.id === id);
				return {
					...state,
					cart: [
						...state.cart.slice(0, indexOfPrevItem),
						newItem,
						...state.cart.slice(indexOfPrevItem + 1)
					],
					total: incTotal
				}
			}

		case 'DELETE_ITEM_FROM_CART':
			const idx = action.payload;
			const itemToDelete = state.cart.find(item => item.id === idx); // item to delete
			if (itemToDelete.count > 1) {
				const priceOfOneProduct = itemToDelete.price / itemToDelete.count;
				const decTotal = state.total - priceOfOneProduct;
				const newArr = state.cart.map(item => {
					if (item.id === idx) {
						item.price -= priceOfOneProduct;
						item.count--;
					}
					return item;
				})
				return {
					...state,
					cart: [
						...newArr
					],
					total: decTotal
				}
			} else {
				const items = state.cart.filter(el => +el.id !== +idx); // all items except deleted
				const decTotal = state.total - itemToDelete.price;
				return {
					...state,
					cart: [
						...items
					],
					total: decTotal
				}
			}
		case 'DELETE_INSTANTLY_FROM_CART':
			const idxx = action.payload;
			const newArr = state.cart.filter(item => item.id !== idxx);
			const item = state.cart.find(item => item.id === idxx);
			const newTotal = state.total - item.price;
			return {
				...state,
				cart: [
					...newArr
				],
				total: newTotal
			}
		default:
			return state;
	}
}

export default reducer;



// setState
// 
// { a:0, b:0 }
// setState({a:500}) 
// res = {a: 500, b:0}
// 
// reducer
// 
// const reducer = (state, action) => {
// 		return { a:500 }
// }
// res = {a: 500}
// 
// Поэтому в reducer необходимо писать все переменные стейта 
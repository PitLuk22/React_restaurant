const menuLoaded = (newMenu) => {
	return {
		type: 'MENU_LOADED',
		payload: newMenu
	}
}

const menuRequested = () => {
	return {
		type: 'MENU_REQUESTED'
	}
}

const menuError = () => {
	return {
		type: 'MENU_ERROR'
	}
}

const addToCart = (id) => {
	return {
		type: 'ADD_ITEM_TO_CARD',
		payload: id
	}
}

const deleteFromCart = (id) => {
	return {
		type: 'DELETE_ITEM_FROM_CART',
		payload: id
	}
}
const deleteInstantlyFromCart = (id) => {
	return {
		type: 'DELETE_INSTANTLY_FROM_CART',
		payload: id
	}
}
const clearCart = (id) => {
	return {
		type: 'CLEAR_CART'
	}
}

export {
	menuLoaded,
	menuRequested,
	menuError,
	addToCart,
	deleteFromCart,
	deleteInstantlyFromCart,
	clearCart
}
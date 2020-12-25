import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import WithRestoService from '../hoc';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {

	componentDidMount() {
		const { RestoService, menuLoaded, menuRequested, menuError } = this.props;

		menuRequested(); // action

		RestoService.getMenuItems()
			.then(res => menuLoaded(res))
			.catch(() => menuError())
	}


	render() {
		const { menuItems, loading, error, addToCart, deleteFromCart, cart } = this.props;

		if (loading) {
			return <Spinner />
		}

		if (error) {
			return <Error />
		}

		const items = menuItems.map(menuItem => {

			const cartItem = cart.filter(item => item.id === menuItem.id);
			const count = cartItem.length > 0 ? cartItem[0].count : null;

			return <MenuListItem
				key={menuItem.id}
				menuItem={menuItem}
				isLoading={loading}
				onAddToCart={() => addToCart(menuItem.id)}
				onDeleteFromCart={() => deleteFromCart(menuItem.id)}
				count={count} />
		})
		return (
			<View items={items} />
		)
	}
};

const mapStateToProps = (state) => {
	return ({
		menuItems: state.menu,
		loading: state.loading,
		error: state.error,
		cart: state.cart
	})
}

const View = ({ items }) => {
	// items - array which consist from components (MenuListItem)
	return (
		<ul className="menu__list">
			{items}
		</ul>
	)
}

export default WithRestoService(connect(mapStateToProps, actions)(MenuList));


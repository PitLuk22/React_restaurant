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
		const { menuItems, loading, error, addToCart } = this.props;

		if (loading) {
			return <Spinner />
		}

		if (error) {
			return <Error />
		}

		const items = menuItems.map(menuItem => {
			return <MenuListItem
				key={menuItem.id}
				menuItem={menuItem}
				isLoading={loading}
				onAddToCart={() => addToCart(menuItem.id)} />
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
		error: state.error
	})
}

const View = ({ items }) => {
	return (
		<ul className="menu__list">
			{items}
		</ul>
	)
}

export default WithRestoService(connect(mapStateToProps, actions)(MenuList));


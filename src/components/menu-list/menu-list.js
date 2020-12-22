import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import WithRestoServive from '../hoc';

import './menu-list.scss';

class MenuList extends Component {

	state = {
		items: null
	}

	componentDidMount() {
		this.getData();
	}

	getData() {
		const { RestoService } = this.props;

		RestoService.getMenuItems()
			.then(res => this.setState({ items: res }));
	}

	render() {

		return (
			<ul className="menu__list">
				<MenuListItem data={this.state.items} />
			</ul>
		)
	}
};


export default WithRestoServive(MenuList);
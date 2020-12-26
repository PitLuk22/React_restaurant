import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './app-header.scss';

const AppHeader = ({ total }) => {

	const setActiveClass = (path) => {
		return window.location.pathname.includes(path) ? 'header__link active' : 'header__link';
	}

	return (
		<header className="header">
			<ul className='header__navbar'>
				<div className="header__marker"></div>
				<li>
					<Link className={setActiveClass('home')} to="/home">
						Home
           			 </Link>
				</li>
				<li>
					<Link className={setActiveClass('menu')} to="/menu">
						Menu
            		</Link>
				</li>
				<li>
					<Link className={setActiveClass('cart')} to="/cart">
						<img className="header__cart" src={cartIcon} alt="cart" />
                		Total: {total} $
            		</Link>
				</li>
			</ul>
		</header>
	)
};


const mapStateToProps = (state) => {
	return {
		total: state.total
	}
}

export default withRouter(connect(mapStateToProps)(AppHeader));
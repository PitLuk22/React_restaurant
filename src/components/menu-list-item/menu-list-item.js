import React from 'react';
import { Link } from 'react-router-dom';
import './menu-list-item.scss';

const MenuListItem = ({ menuItem, onAddToCart }) => {

	const { id, title, price, url, category, info } = menuItem;

	let color;
	switch (info) {
		case 'Salad':
			color = 'green';
			break;
		case 'Meat':
			color = 'red';
			break;
		case 'Pizza':
			color = 'orange';
			break;
		default:
			color = 'white';
	}

	return (
		<Link to={`/menu/${id}`}>
			<li className="menu__item">
				<div className="menu__title">{title}</div>
				<div className="menu__wrapper">
					<div className="menu__more">More info</div>
					<img className="menu__img" src={url} alt={title}></img>
					<div className="menu__info" style={{ backgroundColor: `${color}` }}>{info}</div>
				</div>
				<div className="menu__category">Category: <span>{category}</span></div>
				<div className="menu__price">Price: <span>{price}$</span></div>
				<button onClick={(e) => {
					e.preventDefault();
					onAddToCart();
				}}
					className="menu__btn">
					Add to cart
				</button>
			</li>
		</Link>
	)
}

export default MenuListItem;
import React from 'react';
import { Link } from 'react-router-dom';
import CounterBlock from '../counter-block';

import './menu-list-item.scss';

const MenuListItem = ({ menuItem, onAddToCart, onDeleteFromCart, count }) => {

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

	const counter = count < 1
		? null
		: <CounterBlock
			id={id}
			onAddToCart={onAddToCart}
			onDeleteFromCart={onDeleteFromCart}
			count={count} />

	return (

		<li className="menu__item">
			<div className="menu__title">{title}</div>
			<Link to={`/menu/${id}`}>
				<div className="menu__wrapper">
					<div className="menu__more">More info</div>
					<img className="menu__img" src={url} alt={title}></img>
					<div className="menu__info" style={{ backgroundColor: `${color}` }}>{info}</div>
				</div>
			</Link>
			<div className="menu__category">Category: <span>{category}</span></div>
			<div className="menu__price">Price: <span>{price}$</span></div>
			<div className="menu__tools">
				<button onClick={() => onAddToCart()}
					className="menu__btn">
					Add to cart
					</button>
				{counter}
			</div>
		</li>

	)
}



export default MenuListItem;
import React from 'react';

import './menu-list-item.scss';

const MenuListItem = (props) => {

	const randomKey = () => {
		return new Date().getTime() * Math.random();
	}

	const createItems = ({ data }) => {
		return data.map(({ title, price, url, category }) => {
			return (
				<li key={randomKey()} className="menu__item">
					<div className="menu__title">{title}</div>
					<div className="menu__wrapper">
						<img className="menu__img" src={url} alt={title}></img>
					</div>
					<div className="menu__category">Category: <span>{category}</span></div>
					<div className="menu__price">Price: <span>{price}$</span></div>
					<button className="menu__btn">Add to cart</button>
				</li>
			)
		})
	}

	const items = props.data ? createItems(props) : null;

	return (
		<>
			{/* <li className="menu__item">
				<div className="menu__title">Cesar salad</div>
				<img className="menu__img" src="https://static.1000.menu/img/content/21458/-salat-cezar-s-kr-salat-cezar-s-krevetkami-s-maionezom_1501173720_1_max.jpg" alt="Cesar salad"></img>
				<div className="menu__category">Category: <span>salads</span></div>
				<div className="menu__price">Price: <span>12$</span></div>
				<button className="menu__btn">Add to cart</button>
			</li>
			<li className="menu__item">
				<div className="menu__title">Cesar salad</div>
				<img className="menu__img" src="https://static.1000.menu/img/content/21458/-salat-cezar-s-kr-salat-cezar-s-krevetkami-s-maionezom_1501173720_1_max.jpg" alt="Cesar salad"></img>
				<div className="menu__category">Category: <span>salads</span></div>
				<div className="menu__price">Price: <span>12$</span></div>
				<button className="menu__btn">Add to cart</button>
			</li> */}
			{items}
		</>
	)
}

export default MenuListItem;
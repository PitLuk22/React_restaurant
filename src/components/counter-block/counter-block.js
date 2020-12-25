import React from 'react';

import './counter-block.scss';

const CounterBlock = ({ id, onDeleteFromCart, onAddToCart, count }) => {

	const display = count < 1 ? 'none' : 'flex';

	return (
		<div style={{ display: `${display}` }} className="menu__counter">
			<div onClick={() => onDeleteFromCart(id)} onMouseDown={(e) => stopSelect(e)} className="counter dec">&minus;</div>
			<div className="counter count">{count}</div>
			<div onClick={() => onAddToCart(id)} onMouseDown={(e) => stopSelect(e)} className="counter inc">+</div>
		</div>
	)
}

const stopSelect = (event) => {
	event.stopPropagation();
	event.preventDefault();
	return false;
}

export default CounterBlock;
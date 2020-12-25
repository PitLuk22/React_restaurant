import React, { useState } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions';
import WithRestoService from '../hoc';
import Modal from '../modal';

import './cart-table.scss';
import svgCart from './empty-cart.svg';

const CartTable = (props) => {

	const [modal, setModal] = useState(false);
	const [response, setResponse] = useState(null);

	const sendDataCart = ({ RestoService, cart, clearCart }) => {
		let totalBill = 0;
		cart.forEach(item => {
			totalBill += item.price
		})
		const newOrder = generateOrder(cart);

		RestoService.postData(newOrder, totalBill)
			.then(() => {
				clearCart();	  // clear cart
				setResponse(true);// define modal text
			})
			.catch(() => setResponse(false)) // define modal text
			.finally(() => setModal(!modal)) // show modal
	}

	const renderModal = modal ? <Modal response={response} /> : null;

	const elementsToRender = props.cart.length < 1 ?
		<p><img src={svgCart} alt="empty" /></p> :
		<>
			<View {...props} />
			<button
				onClick={() => {
					sendDataCart(props);
				}} className='cart__checkout'>
				Proceed to checkout
			</button>
		</>

	return (
		<>
			<div className="cart__title">Your cart:</div>
			{elementsToRender}
			{renderModal}
		</>
	);
};


const generateOrder = (items) => {
	const newOrder = items.map(item => {
		return {
			id: item.id,
			title: item.title,
			price: item.price,
			count: item.count
		}
	})
	return newOrder;
}

const View = ({ cart, deleteFromCart, addToCart, deleteInstantlyFromCart }) => {
	return (
		<div className="cart__list">
			{
				cart.map(({ title, price, url, id, count }) => {
					return (
						<div key={id} className="cart__item">
							<div className='cart__item-wrapper'>
								<img className='cart__item-img' src={url} alt={title} />
							</div>
							<div className="cart__item-title">{title}</div>
							<div className="cart__item-counter">
								<div onClick={() => deleteFromCart(id)} className="counter dec">&minus;</div>
								<div className="counter count">{count}</div>
								<div onClick={() => addToCart(id)} className="counter inc">+</div>
							</div>
							<div className="cart__item-price">{price}$</div>
							<div onClick={() => deleteInstantlyFromCart(id)} className="cart__close">&times;</div>
						</div>
					)
				})
			}
		</div>
	)
}

const mapStateToProps = ({ cart }) => {
	return {
		cart
	}
}

export default WithRestoService(connect(mapStateToProps, actions)(CartTable));
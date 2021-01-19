import React, { Component } from 'react';
import WithRestoService from '../hoc';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import CounterBlock from '../counter-block';
import styled from 'styled-components';

const Wrapper = styled.div`
	width:100vw;
	min-height: calc(100vh - 60px);
	display: flex;
	justify-content: center;
	align-items: center;
	.menu {
		&__item {
			width: 35%;
			height: 90vh;
			transform: translateY(3rem);
			&:hover .menu__img{
				transform: scale(100%);
			}
		}
		&__wrapper {
			height: 40%;
		}
		&__img {
			height: 100%;
		}
		&__descr {
			text-align: left;
			line-height: 30px;
			margin-bottom: 20px;
			overflow: scroll;
			height: 30%;
			box-shadow: inset 0 0 10px rgba(0,0,0, .1);
			border-radius: 5px;
			padding: 10px 20px;
		}
	}
`;

class ItemPage extends Component {

	componentDidMount() {
		const { RestoService, menuLoaded, menuRequested, menuError } = this.props;

		menuRequested(); // action

		RestoService.getMenuItems()
			.then(res => menuLoaded(res))
			.catch(() => menuError())
	}

	render() {
		if (this.props.loading) {
			return (
				<div className="item_page">
					<Spinner />
				</div>
			)
		}

		const item = this.props.menuItems.find(el => +el.id === +this.props.itemId)

		const { info, descr, title, url, category, price, id } = item;
		const { addToCart, deleteFromCart, cart } = this.props;

		const cartItem = cart.filter(cartItem => cartItem.id === item.id);
		const count = cartItem.length > 0 ? cartItem[0].count : null;

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
				onAddToCart={addToCart}
				onDeleteFromCart={deleteFromCart}
				count={count} />


		return (
			<Wrapper>
				<div className="menu__item">
					<div className="menu__title">{title}</div>
					<div className="menu__wrapper">
						<img className="menu__img" src={url} alt={title}></img>
						<div className="menu__info" style={{ backgroundColor: `${color}` }}>{info}</div>
					</div>
					<div className="menu__descr">{descr}</div>
					<div className="menu__category">Category: <span>{category}</span></div>
					<div className="menu__price">Price: <span>{price}$</span></div>
					<div className="menu__tools">
						<button onClick={() => addToCart(id)} className="menu__btn">Add to cart</button>
						{counter}
					</div>
				</div>
			</Wrapper>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		menuItems: state.menu,
		loading: state.loading,
		error: state.error,
		cart: state.cart
	}
}

export default WithRestoService(connect(mapStateToProps, actions)(ItemPage));
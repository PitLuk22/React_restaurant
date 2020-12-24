import React, { Component } from 'react';
import WithRestoService from '../hoc';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import styled from 'styled-components';

const Wrapper = styled.div`
	width:100%;
	min-height: calc(100vh - 60px);
	display: flex;
	justify-content: center;
	align-items: center;
	.menu {
		&__item {
			width: 500px;
			&:hover .menu__img{
				transform: scale(100%);
			}
		}
		&__wrapper {
			height: 250px;
		}
		&__img {
			height: 250px;
		}
		&__descr {
			text-align: left;
			line-height: 30px;
			margin-bottom: 20px;
			overflow: scroll;
			height: 160px;
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
					<button onClick={() => this.props.addToCart(id)} className="menu__btn">Add to cart</button>
				</div>
			</Wrapper>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		menuItems: state.menu,
		loading: state.loading,
		error: state.error
	}
}

export default WithRestoService(connect(mapStateToProps, actions)(ItemPage));
import React from 'react';
import { MainPage, CartPage, HomePage, ItemPage } from '../pages';
import { Switch, Route } from 'react-router-dom'
import AppHeader from '../app-header';

import Background from './food-bg.jpg';

const App = () => {

	return (
		<div style={{ minHeight: '100vh', background: `url(${Background}) center center/cover no-repeat` }} className="app">
			<AppHeader total={50} />
			<Switch>
				<Route path='/home' exact component={HomePage} />
				<Route path='/menu' exact component={MainPage} />
				<Route path='/cart' exact component={CartPage} />
				<Route path='/menu/:id' render={
					({ match }) => {
						const { id } = match.params;
						return <ItemPage itemId={id} />
					}
				} />
			</Switch>

		</div>
	)
}

export default App;
import React from 'react';
import { MainPage, CartPage, HomePage } from '../pages';
import { Switch, Route } from 'react-router-dom'
import AppHeader from '../app-header';

import Background from './food-bg.jpg';

const App = () => {

	return (
		<div style={{ background: `url(${Background}) center center/cover no-repeat` }} className="app">
			<AppHeader total={50} />
			<Switch>
				<Route path='/' exact component={HomePage} />
				<Route path='/menu' exact component={MainPage} />
				<Route path='/cart' exact component={CartPage} />
			</Switch>

		</div>
	)
}

export default App;
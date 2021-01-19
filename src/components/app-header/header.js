import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cartIcon from './shopping-cart-solid.svg';

const useStyles = makeStyles(() => ({
	root: {
		position: 'fixed',
		zIndex: '1000',
		backgroundColor: 'rgba(0,0,0, .8)',
	},
	flex: {
		display: 'flex',
		justifyContent: 'space-between',
		'& div': {
			'& div': {
				display: 'flex',
				justifyContent: 'end',
				height: '20px'
			}
		}
	},
	total: {
		minHeight: '48px',
		'& span': {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			'& img': {
				width: '20px',
				margin: '3px 10px 0 0',
			}
		}
	}
}));




const AppHeader = ({ total }) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const Com = () => {
		return (
			<img className="header__cart" src={cartIcon} alt="cart" />
		)
	}


	return (
		<div >
			<AppBar className={classes.root}>
				<Tabs className={classes.flex} value={value} onChange={handleChange}>
					<Tab label="Home" to='/' component={Link} />
					<Tab label="Menu" to='/menu' component={Link} />
					<Tab className={classes.total} icon={<Com />} label={`Total: ${total} $`} to='/cart' component={Link} />
				</Tabs>
			</AppBar>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		total: state.total
	}
}
export default connect(mapStateToProps)(AppHeader);
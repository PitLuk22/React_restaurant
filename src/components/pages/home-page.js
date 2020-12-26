import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
	min-height: calc(100vh - 60px);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 3.5em;
	color: #fff;
	text-shadow: 5px 5px 5px #000;
`;

const HomePage = () => {
	return (
		<Div className="home">
			Welcome to our restaurant!
		</Div>
	)
}

export default HomePage;
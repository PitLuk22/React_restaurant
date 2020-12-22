import React, { useState, useEffect } from 'react';

const Spinner = () => {
	const [dots, setDots] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			dots.length >= 3 ? setDots([]) : setDots(dots => dots + '.');
		}, 300);
		return () => clearInterval(interval)
	})

	return <div className="spinner">loading{dots}</div>
}

export default Spinner;
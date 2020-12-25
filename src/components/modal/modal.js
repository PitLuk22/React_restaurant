import React, {useState, useEffect} from 'react';

import './modal.scss';

const Modal = (props) => {
	const [modal, deleteModal] = useState(false)
	useEffect(() => {
		const timerId = setTimeout(() => {
			deleteModal(true);
		}, 4000);
		return () => {
			clearTimeout(timerId);
		}
	})

	if (modal) {
		return null;
	}

	const item = props.response ? <ViewOk /> : <ViewError />;
	return (
		<div className="modal__overlay">
			<div className="modal__window">
				{item}
			</div>
		</div>
	)
}

const ViewOk = () => {
	return (
		<span className='modal__text'>
			Thanks for you order! <br/> we'll contact you as soon as possible. <br/> Bon Appetit!
		</span>
	)
}
const ViewError = () => {
	return (
		<span className='modal__text'>
					Something went wrong! <br/> Try it again later!
		</span>
	)
}

export default Modal;
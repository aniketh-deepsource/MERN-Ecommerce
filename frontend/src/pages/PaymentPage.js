import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutStatus from '../components/CheckoutStatus';
import { savePaymentMethod } from '../actions/cartActions';
import { refreshLogin, getUserDetails } from '../actions/userActions';

const PaymentPage = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error } = userDetails;

	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	useEffect(() => {
		if (error && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [error, dispatch, userInfo]);

	useEffect(() => {
		if (!shippingAddress) {
			history.push('/shipping');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (e) => {
		setPaymentMethod(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutStatus step1 step2 step3 />
			<div
				style={{
					display: 'flex',
					flexFlow: 'column nowrap',
					alignItems: 'center',
				}}>
				<h1>Payment Method</h1>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						{/* <Form.Label as='legend'>Select Method</Form.Label> */}
						<Col>
							<Form.Check
								inline
								type='radio'
								label='Credit/Debit Card'
								id='Credit/Debit Card'
								name='paymentMethod'
								value='Credit/Debit Card'
								checked={paymentMethod === 'Credit/Debit Card'}
								onChange={handleChange}
							/>
							<Form.Check
								inline
								type='radio'
								label='PayPal Account'
								id='PayPal'
								name='paymentMethod'
								value='PayPal'
								checked={paymentMethod === 'PayPal'}
								onChange={handleChange}
							/>
						</Col>
					</Form.Group>
					<div className='d-grid'>
						<Button
							type='submit'
							className='my-3'
							size='lg'
							// variant='info'
							// onClick={
							// 	successDeliveryHandler
						>
							Continue
						</Button>
					</div>
					{/* <Button type='submit' variant='dark' className='my-1'>
						Continue
					</Button> */}
				</Form>
			</div>
		</FormContainer>
	);
};

export default PaymentPage;

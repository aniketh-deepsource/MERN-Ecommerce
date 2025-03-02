import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAILURE,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAILURE,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAILURE,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAILURE,
	ORDER_USER_LIST_REQUEST,
	ORDER_USER_LIST_SUCCESS,
	ORDER_USER_LIST_FAILURE,
	ORDER_ALL_LIST_REQUEST,
	ORDER_ALL_LIST_SUCCESS,
	ORDER_ALL_LIST_FAILURE,
} from '../constants/orderConstants';

import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = userInfo.isSocialLogin
			? {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `SocialLogin ${userInfo.id}`,
					},
			  }
			: {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.accessToken}`,
					},
			  };

		const { data } = await axios.post('/api/orders/', order, config);

		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderDetails = (orderID) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = userInfo.isSocialLogin
			? {
					headers: {
						Authorization: `SocialLogin ${userInfo.id}`,
					},
			  }
			: {
					headers: {
						Authorization: `Bearer ${userInfo.accessToken}`,
					},
			  };

		const { data } = await axios.get(`/api/orders/${orderID}`, config);

		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const payOrder =
	(orderID, paymentResult) => async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_PAY_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = userInfo.isSocialLogin
				? {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `SocialLogin ${userInfo.id}`,
						},
				  }
				: {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${userInfo.accessToken}`,
						},
				  };

			const { data } = await axios.put(
				`/api/orders/${orderID}/pay`,
				paymentResult,
				config
			);

			dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_PAY_FAILURE,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const deliverOrder = (orderID) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DELIVER_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = userInfo.isSocialLogin
			? {
					headers: {
						Authorization: `SocialLogin ${userInfo.id}`,
					},
			  }
			: {
					headers: {
						Authorization: `Bearer ${userInfo.accessToken}`,
					},
			  };

		const { data } = await axios.put(
			`/api/orders/${orderID}/deliver`,
			{},
			config
		);

		dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_DELIVER_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_USER_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = userInfo.isSocialLogin
			? {
					headers: {
						Authorization: `SocialLogin ${userInfo.id}`,
					},
			  }
			: {
					headers: {
						Authorization: `Bearer ${userInfo.accessToken}`,
					},
			  };

		const { data } = await axios.get(`/api/orders/myorders`, config);

		dispatch({ type: ORDER_USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_USER_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listAllOrders =
	(pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_ALL_LIST_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = userInfo.isSocialLogin
				? {
						headers: {
							Authorization: `SocialLogin ${userInfo.id}`,
						},
				  }
				: {
						headers: {
							Authorization: `Bearer ${userInfo.accessToken}`,
						},
				  };

			const { data } = await axios.get(
				`/api/orders?pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: ORDER_ALL_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ORDER_ALL_LIST_FAILURE,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

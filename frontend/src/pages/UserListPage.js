import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listAllUsers, deleteUser, refreshLogin } from '../actions/userActions';

const UserListPage = ({ history }) => {
	const dispatch = useDispatch();
	const userList = useSelector((state) => state.userList);
	const { loading, users, error } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) dispatch(listAllUsers());
		else history.push('/login');
	}, [dispatch, history, userInfo, successDelete]);

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you wanna delete user?'))
			dispatch(deleteUser(id));
	};
	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger' duration={10}>
					{error}
				</Message>
			) : (
				<Table
					striped
					bordered
					responsive
					className='table-sm text-center'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>CONFIRMED</th>
							<th>ADMIN</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							return (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>
										<a href={`mailto:${user.email}`}>
											{user.email}
										</a>
									</td>
									<td>
										{user.isConfirmed ? (
											<i
												className='fas fa-check'
												style={{ color: 'green' }}></i>
										) : (
											<i
												className='fas fa-times'
												style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{user.isAdmin ? (
											<i
												className='fas fa-check'
												style={{ color: 'green' }}></i>
										) : (
											<i
												className='fas fa-times'
												style={{ color: 'red' }}></i>
										)}
									</td>

									<td
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-around',
										}}>
										<LinkContainer
											to={`/admin/user/${user._id}/edit`}>
											<Button
												variant='link'
												className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											className='btn-sm'
											variant='danger'
											onClick={() =>
												handleDelete(user._id)
											}>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListPage;

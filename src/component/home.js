import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../fireBase';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import {
	Box,
	TextField,
	Grid,
	Typography,
	List,
	ListItem,
	IconButton,
	Button,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Alertcomp from './alert';
import CircularProgress from '@mui/material/CircularProgress';

import DoneIcon from '@mui/icons-material/Done';
const Home = () => {
	const nav = useNavigate();
	const [todo, setTodo] = useState('');
	const [edit, setEdit] = useState(false);
	const [editId, setEditId] = useState('');
	const [todoList, setTodoList] = useState([]);

	const [open, setOpen] = useState(false);
	const [errorText, setErrorText] = useState('');
	const [loading, setLoading] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
					setTodoList([]);
					const data = snapshot.val();
					if (data !== null) {
						Object.values(data).map((todo) => {
							setTodoList((oldArray) => [...oldArray, todo]);
						});
					} else {
						setLoading(true);
					}
				});
			} else if (!user) {
				nav('/');
			}
		});
	}, []);
	const logoutHandler = () => {
		signOut(auth)
			.then(() => {
				nav('/');
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	//////////////////////////////WRITE//////////////////////////////
	const writeToDataBase = () => {
		const uidd = uid();
		if (todo) {
			set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
				todo,
				uidd,
				done: false,
			});

			setTodo('');
		} else {
			setErrorText('please write something . . .');
			setOpen(true);
		}
	};

	//////////////////////////////DELETE//////////////////////////////

	const handleDelete = (x) => {
		remove(ref(db, `/${auth.currentUser.uid}/${x}`)).catch((err) => {
			alert(err.message);
		});
	};

	//////////////////////////////UPDATE//////////////////////////////

	const handleUpdate = (x) => {
		if (todo) {
			update(ref(db, `/${auth.currentUser.uid}/${x}`), {
				todo,
				done: false,
			}).catch((err) => {
				alert(err.message);
			});
		} else {
			alert('please write something');
		}
	};

	const handleDone = ({ uidd, todo }) => {
		update(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
			todo,
			done: true,
		}).catch((err) => {
			alert(err.message);
		});
	};

	return (
		<Stack
			justifyContent='center'
			alignItems='center'
			width='70%'
			sx={{
				width: { xs: '90%' },
				minHeight: 'calc(100vh - 150px)',
			}}
			m='50px auto'>
			<Box
				sx={{
					display: 'flex',
					alignItems: { xs: 'center', sm: 'flex-end' },
					justifyContent: 'center',
					margin: '0 auto',
					// marginTop: '100px',
					width: '100%',
					flexDirection: { xs: 'column', sm: 'row' },
				}}>
				<PlaylistAddIcon
					sx={{
						color: 'action.active',
						mr: 1,
						my: 0.5,
						display: { xs: 'none' },
					}}
				/>
				<TextField
					label='Add Task'
					variant='standard'
					type='text'
					onChange={(e) => setTodo(e.target.value)}
					value={todo}
					sx={{
						width: { xs: '100%', sm: '50%' },
					}}
				/>
				<Button
					variant='contained'
					onClick={writeToDataBase}
					disabled={edit ? true : false}
					sx={{
						marginLeft: { xs: '0', sm: '30px' },
						marginTop: { xs: '20px', sm: '0' },
					}}>
					Add Todo
				</Button>
			</Box>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					flexDirection: 'column',
					margin: '0 auto',
					width: '100%',
					minHeight: '60vh',
					marginTop: '50px',
					mt: { xs: 4, sm: '50px' },
				}}>
				<Typography
					sx={{ mt: { xs: 2, sm: 4 }, mb: 2 }}
					variant='h6'
					component='div'>
					All Your Todos :
				</Typography>

				<List
					sx={{
						width: { xs: '100%', sm: '70%' },
					}}>
					{todoList.length ? (
						todoList.map((item) => (
							<ListItem
								key={item.uid}
								secondaryAction={
									item.done ? (
										<IconButton
											edge='end'
											aria-label='delete'
											onClick={() => handleDelete(item.uidd)}>
											<DeleteIcon color='error' />
										</IconButton>
									) : null
								}>
								<ListItemAvatar>
									<Avatar>
										{item.done ? (
											<DoneAllIcon
												color='success'
												sx={{ color: 'rgb(24, 243, 0)' }}
											/>
										) : (
											<HourglassFullIcon sx={{ color: '#2980b9' }} />
										)}
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									sx={{
										color: 'rgb(50,50,50)',
										wordWrap: 'break-word',
									}}
									primary={item.todo}
									secondary={false ? 'Secondary text' : null}
								/>

								{edit && editId === item.uidd ? (
									<Button
										variant='contained'
										onClick={() => {
											handleUpdate(item.uidd);
											setTodo('');
											setEdit(false);
										}}
										sx={{
											marginRight: '10px',

											color: 'rgb(244, 244, 244)',
											borderColor: 'rgb(244, 244, 244)',
										}}>
										Ok
									</Button>
								) : (
									<>
										{!item.done ? (
											<>
												<EditIcon
													onClick={() => {
														setEdit(true);
														setTodo(item.todo);
														setEditId(item.uidd);
													}}
													sx={{
														marginRight: '10px',
														display: { xs: 'block', sm: 'none' },
													}}
												/>

												<Button
													variant='outlined'
													disabled={item.done ? true : false}
													onClick={() => {
														setEdit(true);
														setTodo(item.todo);
														setEditId(item.uidd);
													}}
													sx={{
														color: 'rgb(244, 244, 244)',
														borderColor: 'rgb(244, 244, 244)',
														display: { xs: 'none', sm: 'block' },
													}}>
													update
												</Button>
											</>
										) : null}
									</>
								)}
								<>
									<DoneOutlineIcon
										onClick={() => {
											handleDone(item);
										}}
										sx={{
											display: { xs: 'block', sm: 'none' },
										}}
									/>
									<Button
										variant='outlined'
										disabled={item.done ? true : false}
										onClick={() => {
											handleDone(item);
										}}
										sx={{
											color: 'rgb(244, 244, 244)',
											borderColor: 'rgb(244, 244, 244)',
											marginLeft: '10px',
											display: { xs: 'none', sm: 'block' },
										}}>
										{item.done ? 'finished' : 'finish'}
									</Button>
								</>
							</ListItem>
						))
					) : (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								margin: '50px 0',
								flexDirection: 'column',
								alignItems: 'center',
							}}>
							{loading ? (
								<>
									<h3>Nothing yet</h3>
									you can add task easily by typing in input field
								</>
							) : (
								<CircularProgress></CircularProgress>
							)}
						</Box>
					)}
				</List>
			</Box>

			<Button
				variant='contained'
				onClick={logoutHandler}
				sx={{
					padding: '10px 35px',
				}}>
				Logout
			</Button>
			{open ? (
				<Alertcomp
					text={errorText}
					severity='error'
					handleClose={handleClose}
				/>
			) : null}
		</Stack>
	);
};

export default Home;

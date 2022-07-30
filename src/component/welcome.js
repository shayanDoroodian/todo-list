import React, { useState, useEffect } from 'react';
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../fireBase.js';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Welcome = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [register, setRegister] = useState(false);
	const [showPassword, setShowpassword] = useState(false);
	const [showConfirmPassword, setShowConfirmpassword] = useState(false);
	const [registerInfo, setRegisterInfo] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const nav = useNavigate();
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				nav('/home');
			}
		});
	}, []);
	/////////////////////////////////////////////////////////////LOGIN/////////////////////////////////////////////////////////////////
	const emailHandler = (e) => {
		setEmail(e.target.value);
	};
	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};
	const login = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				nav('/home');
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	/////////////////////////////////////////////////////////////REGISTER/////////////////////////////////////////////////////////////////

	const registerHandler = () => {
		if (registerInfo.password === registerInfo.confirmPassword) {
			createUserWithEmailAndPassword(
				auth,
				registerInfo.email,
				registerInfo.password
			)
				.then(() => {
					nav('/home');
				})
				.catch((err) => {
					alert(err.message);
				});
		} else {
			alert('confirm password are not the same');
		}
	};

	return (
		<Stack
			alignItems='center'
			justifyContent='center'
			display='flex'
			width='100vw'
			height='100vh'>
			{register ? (
				<>
					<Typography variant='h3' textAlign='center' mb={10}>
						Register
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							margin: '0 auto',
							width: '100%',
							flexDirection: 'column',
						}}>
						<Box
							width={'100%'}
							sx={{
								textAlign: 'center',
								alignItems: 'center	',
								justifyContent: 'center',
								display: 'flex',
								flexDirection: 'column',
							}}>
							<TextField
								variant='outlined'
								type='email'
								placeholder='Email'
								value={registerInfo.email}
								onChange={(e) =>
									setRegisterInfo({
										...registerInfo,
										email: e.target.value,
									})
								}
								sx={{
									width: { xs: '80%', sm: '40%' },
								}}
							/>

							<OutlinedInput
								sx={{
									width: { xs: '80%', sm: '40%' },

									marginTop: '15px',
								}}
								placeholder='password'
								type={showPassword ? 'text' : 'password'}
								value={registerInfo.password}
								onChange={(e) =>
									setRegisterInfo({
										...registerInfo,
										password: e.target.value,
									})
								}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={() => setShowpassword(!showPassword)}
											edge='end'>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
							<OutlinedInput
								sx={{
									width: { xs: '80%', sm: '40%' },

									marginTop: '15px',
								}}
								type={showConfirmPassword ? 'text' : 'password'}
								value={registerInfo.confirmPassword}
								placeholder='confirm password'
								onChange={(e) =>
									setRegisterInfo({
										...registerInfo,
										confirmPassword: e.target.value,
									})
								}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={() =>
												setShowConfirmpassword(!showConfirmPassword)
											}
											edge='end'>
											{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</Box>
						<Button
							onClick={registerHandler}
							variant='contained'
							sx={{
								margin: '50px 0 20px 0',
								padding: '10px 35px',
							}}>
							Register
						</Button>

						<Typography
							onClick={() => {
								setRegister(false);
							}}
							sx={{
								cursor: 'pointer',
								color: 'rgb(100,100,100)',
							}}>
							Go Back
						</Typography>
					</Box>
				</>
			) : (
				<>
					<Typography variant='h3' textAlign='center' mb={10}>
						Welcome
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							margin: '0 auto',
							width: '100%',
							flexDirection: 'column',
						}}>
						<Box
							width={'100%'}
							sx={{
								textAlign: 'center',
								alignItems: 'center	',
								justifyContent: 'center',
								display: 'flex',
								flexDirection: 'column',
							}}>
							<TextField
								// label='Add Task'
								variant='outlined'
								type='text'
								placeholder='Email'
								onChange={emailHandler}
								sx={{
									width: { xs: '80%', sm: '40%' },
								}}
							/>

							<OutlinedInput
								sx={{
									width: { xs: '80%', sm: '40%' },

									marginTop: '15px',
								}}
								placeholder='password'
								id='outlined-adornment-password'
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={passwordHandler}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={() => setShowpassword(!showPassword)}
											edge='end'>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</Box>

						<Button
							variant='contained'
							onClick={login}
							sx={{
								margin: '50px 0 20px 0',
								padding: '10px 35px',
							}}>
							Login
						</Button>
						<Typography
							onClick={() => {
								setRegister(true);
							}}
							sx={{
								marginLeft: '30px',
								color: 'rgb(100,100,100)',
								cursor: 'pointer',
							}}>
							Don't have an account? let's create!
						</Typography>
					</Box>
				</>
			)}
		</Stack>
	);
};

export default Welcome;

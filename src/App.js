import React from 'react';
import Welcome from './component/welcome';
import Home from './component/home';
import { Route, Routes } from 'react-router-dom';
const App = () => {
	return (
		<div className='mainContainer'>
			<Routes>
				<Route path='/' element={<Welcome />}></Route>
				<Route path='/home' element={<Home />}></Route>
			</Routes>
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
				<p id='created'>
					Created by <a href='https://github.com/shayanDoroodian'>Shayan</a>
				</p>
			</div>
		</div>
	);
};

export default App;

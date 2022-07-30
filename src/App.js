import React from 'react';
import Welcome from './component/welcome';
import Home from './component/home';
import { Route, Routes } from 'react-router-dom';
const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Welcome />}></Route>
			<Route path='/home' element={<Home />}></Route>
		</Routes>
	);
};

export default App;

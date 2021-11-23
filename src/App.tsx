import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Clustering from 'views/Clustering';
import Home from 'views/Home';
import Search from 'views/Search';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Home />} path='/' />
				<Route element={<Search />} path='/search' />
				<Route element={<Clustering />} path='/clustering' />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

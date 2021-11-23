import '../App.scss';

import Grid from '@mui/material/Grid';
import Searchbar from 'components/Searchbar';

const Home = () => {
	return (
		<Grid
			container
			direction='column'
			alignItems='center'
			justifyContent='center'
			style={{ height: '100vh' }}>
			<h1>Coorse</h1>
			<Searchbar />
		</Grid>
	);
};

export default Home;

import {
	Checkbox,
	FormControlLabel,
	Grid,
	InputAdornment,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

type SearchProps = {
	value?: string;
	isClustering?: boolean;
};

const Searchbar = (props: SearchProps) => {
	const navigate = useNavigate();
	const [query, setQuery] = useState(props.value ? props.value : '');
	const [clustering, setClustering] = useState(
		props.isClustering ? props.isClustering : false
	);

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter' && query.length > 0) {
			const formattedQuery = query.replace(/ /g, '%20');

			if (clustering) {
				// Handle clustering request
				navigate(`/clustering?q=${formattedQuery}`, { replace: true });
			} else {
				// Handle query request
				navigate(`/search?q=${formattedQuery}`, { replace: true });
			}
			window.location.reload();
		}
	};

	return (
		<Grid container direction='row' marginBottom='30px'>
			<Grid
				container
				width='100%'
				direction='column'
				justifyContent='center'
				alignItems='center'>
				<TextField
					id='outlined-basic'
					label='Search on Coorse'
					variant='outlined'
					value={query}
					style={{
						width: '80%',
						marginBottom: '20px',
					}}
					className='inputRounded'
					onKeyDown={(e) => handleKeyDown(e)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchOutlinedIcon />
							</InputAdornment>
						),
					}}
					onChange={(e) => setQuery(e.target.value)}
				/>

				<FormControlLabel
					control={
						<Checkbox
							checked={clustering}
							onChange={(e) => setClustering(e.target.checked)}
						/>
					}
					label='Cluster Results'
				/>
			</Grid>
		</Grid>
	);
};

export default Searchbar;

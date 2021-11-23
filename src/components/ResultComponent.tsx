import { Box, Grid, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Result } from 'types';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const getPrice = (price: string) => {
	if (price && price !== '0' && price !== '0.0' && price !== 'Free') {
		if (price.toString().indexOf('$') !== -1) {
			return price;
		} else {
			return price.toLocaleString() + '$';
		}
	} else {
		return 'Free';
	}
};

const ResultComponent = (props: Result) => {
	const {
		title,
		description,
		subject,
		difficulty,
		duration,
		link,
		price,
		rating,
	} = props;

	return (
		<Grid pb='30px' mb='20px'>
			<Typography
				sx={{ fontSize: 14 }}
				color='text.secondary'
				gutterBottom>
				{subject}
			</Typography>
			<Link href={link}>
				<Typography variant='h5' component='div'>
					{title}
				</Typography>
			</Link>
			<Typography variant='body2'>{description}</Typography>
			<Grid container mt='20px'>
				<Box display='flex' alignItems='center' mr='20px'>
					<AttachMoneyIcon fontSize='small' />
					<Typography ml='2px' color='text.secondary'>
						{getPrice(price)}
					</Typography>
				</Box>
				<Box display='flex' alignItems='center' mr='20px'>
					<AccessTimeIcon fontSize='small' />
					<Typography ml='8px' color='text.secondary'>
						{duration}
					</Typography>
				</Box>
				{difficulty && (
					<Box display='flex' alignItems='center' mr='20px'>
						<LeaderboardIcon fontSize='small' />
						<Typography ml='8px' color='text.secondary'>
							{difficulty}
						</Typography>
					</Box>
				)}

				{rating > 0 && (
					<Box display='flex' alignItems='center' mr='20px'>
						<ThumbUpIcon fontSize='small' />
						<Typography ml='8px' color='text.secondary'>
							{rating}%
						</Typography>
					</Box>
				)}
			</Grid>
		</Grid>
	);
};

export default ResultComponent;

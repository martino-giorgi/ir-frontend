import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import type { Result } from '../App';

const getPrice = (price: string) => {
	if (price) {
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
	var {
		title,
		description,
		subject,
		difficulty,
		duration,
		link,
		price,
		rating,
	} = props;

	const card = (
		<React.Fragment>
			<CardContent>
				<Typography
					sx={{ fontSize: 14 }}
					color='text.secondary'
					gutterBottom>
					{subject}
				</Typography>
				<Typography variant='h5' component='div'>
					{title}
				</Typography>
				<Typography color='text.secondary'>
					Price: {getPrice(price)}
				</Typography>
				<Typography color='text.secondary'>
					Duration: {duration}
				</Typography>
				<Typography color='text.secondary'>
					Difficulty: {difficulty ? difficulty : 'N/A'}
				</Typography>
				<Typography sx={{ mb: 1 }} color='text.secondary'>
					Rating: {rating ? rating + '%' : 'N/A'}
				</Typography>
				<Typography variant='body2'>{description}</Typography>
			</CardContent>
			<CardActions>
				<Button
					onClick={() => {
						window.open(link as string, '_blank');
					}}
					size='small'>
					Go to Course
				</Button>
			</CardActions>
		</React.Fragment>
	);

	return (
		<Box sx={{ width: '100%' }}>
			<Card variant='outlined'>{card}</Card>
		</Box>
	);
};

export default ResultComponent;

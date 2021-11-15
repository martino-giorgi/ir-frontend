import './App.scss';

import { useEffect, useState } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ResultComponent from 'components/ResultComponent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Type of Result
export type Result = {
	id: string;
	title: string;
	link: string;
	price: string;
	subject: string;
	rating: number;
	difficulty: string;
	duration: string;
	description: string;
};

/**
 * Parse the results from the query and display them in a grid.
 * If a field is not available in the result, display 'N/A'.
 */

const parseResults = (docs: [any]): Result[] => {
	var results: Result[] = [];
	docs.forEach((doc) => {
		var result: Result = {
			id: doc.id,
			title: doc.title,
			link: doc.link,
			price: doc.price,
			subject: doc.subject,
			rating: Math.round(doc.rating),
			difficulty: doc.difficulty,
			duration: doc.duration,
			description: doc.description,
		};

		results.push(result);
	});
	return results;
};

const App = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<Result[]>();
	const [selectedCategory, setSelectedCategory] = useState('');
	const [category, setCategory] = useState<String[]>([]);

	useEffect(() => {
		var url =
			'http://localhost:8983/solr/courses/select?facet.field=subject&facet=true&indent=true&q.op=OR&q=*%3A*&rows=0';
		axios.get(url).then((response) => {
			const responseArray =
				response.data.facet_counts.facet_fields.subject;

			// Create a Dictionary of categories and their counts from the facet_fields array.
			// Position i is the category, position i+1 is the count.
			var categories: { [key: string]: number } = {};

			for (var i = 0; i < responseArray.length; i += 2) {
				categories[responseArray[i]] = responseArray[i + 1];
			}
			var map = new Map(Object.entries(categories));
			console.log(map);
			setCategory(Array.from(map.keys()));
		});
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedCategory(event.target.value as string);
	};

	useEffect(() => {
		// console.log(selectedCategory);
		// Replace '&' in selectedCategory with '%26'
		var formattedCategory = selectedCategory.replace('&', '%26');
		// Replace ' ' in formattedCategory with '%20'
		formattedCategory = formattedCategory.replace(' ', '%20');

		var url = `http://localhost:8983/solr/courses/select?indent=true&q.op=OR&q=subject%3A%22${formattedCategory}%22&rows=10000000`;
		axios.get(url).then((response) => {
			setResults(parseResults(response.data.response.docs));
		});
	}, [selectedCategory]);

	const submitQuery = () => {
		// Example query
		// http://localhost:8983/solr/courses/select?indent=true&q.op=OR&q=data%20engineer

		var baseUrl =
			'http://localhost:8983/solr/courses/select?indent=true&q.op=OR&q=';

		// Replace every space with '%20'
		var formattedQuery = query.replace(/ /g, '%20');
		var finalUrl = baseUrl + formattedQuery;

		axios.get(finalUrl).then((res) => {
			// console.log(res.data.response.docs);
			setResults(parseResults(res.data.response.docs));
		});
	};

	return (
		<Grid
			container
			direction='column'
			alignItems='center'
			justifyContent='center'>
			<h1>Coorse</h1>
			<Grid container direction='row'>
				<Grid container direction='column'>
					<TextField
						id='outlined-basic'
						label='Type something'
						variant='outlined'
						onChange={(e) => setQuery(e.target.value)}
					/>
					<Button
						sx={{ mt: '20px' }}
						variant='outlined'
						onClick={() => {
							submitQuery();
						}}>
						Search
					</Button>
				</Grid>

				<Typography variant='h3' component='div' sx={{ mt: 10 }}>
					Or
				</Typography>

				<FormControl fullWidth sx={{ mt: 10 }}>
					<InputLabel id='demo-simple-select-label'>
						Select Category
					</InputLabel>
					<Select
						labelId='category-select-label'
						id='category-select'
						value={selectedCategory}
						label='Category'
						onChange={handleChange}>
						{category.map((cat, i) => (
							<MenuItem
								key={`menuItem${i}`}
								value={cat.toString()}>
								{cat}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>

			{results && results.length > 0 && (
				<Typography variant='h2' component='div' sx={{ mt: 10 }}>
					{results.length} Results
				</Typography>
			)}

			{/* For each Result in results display a ResultComponent */}
			<Grid container justifyContent='center' sx={{ mt: 10 }}>
				{results &&
					results.map((resultElement) => (
						<ResultComponent
							key={resultElement.id}
							id={resultElement.id}
							title={resultElement.title}
							description={resultElement.description}
							link={resultElement.link}
							price={resultElement.price}
							subject={resultElement.subject}
							rating={resultElement.rating}
							difficulty={resultElement.difficulty}
							duration={resultElement.duration}
						/>
					))}
			</Grid>
		</Grid>
	);
};

export default App;

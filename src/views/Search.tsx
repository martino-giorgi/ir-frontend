import { Grid } from '@mui/material';
import axios from 'axios';
import ResultComponent from 'components/ResultComponent';
import Searchbar from 'components/Searchbar';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Result } from 'types';

const Search = () => {
	const [results, setResults] = useState<Result[]>();
	const [searchParams] = useSearchParams();
	const q = searchParams.get('q');

	useEffect(() => {
		const baseUrl =
			'http://localhost:8983/solr/courses/select?indent=true&q.op=OR&q=';

		const finalUrl = baseUrl + q;

		axios.get(finalUrl).then((res) => {
			console.log(res.data);
			setResults(parseResults(res.data.response.docs));
		});
	}, [q]);

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

	return (
		<Grid container justifyContent='center'>
			<Grid
				container
				direction='column'
				spacing={3}
				style={{ width: '90%', marginTop: '30px' }}>
				<Grid container gridTemplateColumns='30% 70%'>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<h1>Coorse</h1>
					</Link>
					<Searchbar value={q ? q : ''} />
				</Grid>

				{results && results.length > 0 && (
					<Grid container direction='column' justifyContent='center'>
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
				)}
			</Grid>
		</Grid>
	);
};

export default Search;

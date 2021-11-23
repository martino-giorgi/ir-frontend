import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import ResultComponent from 'components/ResultComponent';
import Searchbar from 'components/Searchbar';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Result, Cluster } from 'types';

const Clustered = () => {
	const [searchParams] = useSearchParams();
	const q = searchParams.get('q');

	const [results, setResults] = useState<Result[]>([]);
	const [clusters, setClusters] = useState<Cluster[]>([]);
	const [activeCluster, setActiveCluster] = useState<Cluster | undefined>(
		undefined
	);
	const [activeLabel, setActiveLabel] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		const baseUrl =
			'http://localhost:8983/solr/courses/select?indent=true&q.op=OR&q=';

		const finalUrl = baseUrl + q;

		axios.get(finalUrl).then((res) => {
			// Remove _version field from response
			const data = res.data.response.docs.map((doc: any) => {
				delete doc._version_;
				return doc;
			});

			setResults(data);

			const url = 'http://localhost:8080/service/cluster?indent';

			const config = {
				headers: {
					'Content-Type': 'text/json',
				},
			};

			const clusteringRequest = {
				language: 'English',
				algorithm: 'Lingo',
				parameters: {
					preprocessing: {
						phraseDfThreshold: 1,
						wordDfThreshold: 1,
					},
				},
				documents: data,
			};

			axios.post(url, clusteringRequest, config).then((res) => {
				setClusters(res.data.clusters);
			});
		});
	}, [q]);

	const handleClick = (
		event: React.MouseEvent<HTMLElement>,
		label: string | undefined
	) => {
		setActiveLabel(label);
		setActiveCluster(
			clusters.find((cluster) => cluster.labels[0] === label)
		);
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
					<Searchbar value={q ? q : ''} isClustering={true} />
				</Grid>
				{results &&
					clusters &&
					results.length > 0 &&
					clusters.length > 0 && (
						<Grid
							container
							direction='column'
							justifyContent='center'
							gridTemplateColumns='50% 50%'>
							<ToggleButtonGroup
								exclusive
								size='large'
								onChange={handleClick}
								value={activeLabel}>
								{clusters.map((cluster) => (
									<ToggleButton value={cluster.labels[0]}>
										{cluster.labels[0]} (
										{cluster.documents.length} docs)
									</ToggleButton>
								))}
							</ToggleButtonGroup>
							<Grid>
								{/* For each documents in activeCluster render its docs */}
								{activeCluster && (
									<Grid
										container
										direction='column'
										mt='100px'>
										{activeCluster.documents.map(
											(index) => (
												<ResultComponent
													id={results[index].id}
													title={results[index].title}
													link={results[index].link}
													price={results[index].price}
													subject={
														results[index].subject
													}
													rating={
														results[index].rating
													}
													difficulty={
														results[index]
															.difficulty
													}
													duration={
														results[index].duration
													}
													description={
														results[index]
															.description
													}
												/>
											)
										)}
									</Grid>
								)}
							</Grid>
						</Grid>
					)}
			</Grid>
		</Grid>
	);
};

export default Clustered;

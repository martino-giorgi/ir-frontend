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

export type Cluster = {
	labels: string[];
	documents: number[];
	score: number;
	clusters: Cluster[];
};

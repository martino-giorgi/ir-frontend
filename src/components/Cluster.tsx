import {
	Collapse,
	Link,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { StarBorder } from '@mui/icons-material';

const Cluster = (props: any) => {
	const { labels } = props.cluster;
	const [open, setOpen] = useState(false);
	const { documents } = props.cluster;
	const { results } = props;

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<>
			<ListItemButton onClick={handleClick}>
				<ListItemText primary={labels[0]} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					{documents &&
						documents.map((doc: any) => (
							<ListItemButton key={doc} sx={{ pl: 4 }}>
								<ListItemIcon>
									<StarBorder />
								</ListItemIcon>
								<Link href={results[doc].link}>
									<ListItemText
										primary={results[doc].title}
									/>
								</Link>
							</ListItemButton>
						))}
				</List>
			</Collapse>
		</>
	);
};

export default Cluster;

import { Stack } from 'react-bootstrap';

export interface PageHeroProps {
	title: string;
	tagline?: string;
	noDivider?: boolean;
}

export default function PageHero({ title, tagline, noDivider }: PageHeroProps) {
	return (
		<Stack gap={3} className="py-5 text-center">
			<h1 className="display-5">{title}</h1>
			{tagline ? <p className="lead">{tagline}</p> : null}
			{noDivider ? null : <hr />}
		</Stack>
	);
}

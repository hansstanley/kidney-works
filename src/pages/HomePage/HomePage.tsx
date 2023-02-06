import { Button, Container, Stack } from 'react-bootstrap';
import { NAV_LINKS } from '../../utils/constants';

export default function HomePage() {
	return (
		<Container fluid className="text-center py-5">
			<Stack gap={5}>
				<h1 className="display-1 fw-bold">Hire-a-Patient</h1>
				<p className="lead">Tagline goes here</p>
			</Stack>
			<Button variant="secondary" href={NAV_LINKS.JOBS}>
				Explore Jobs
			</Button>
		</Container>
	);
}

import { Button, Container } from 'react-bootstrap';

export default function HomePage() {
	return (
		<Container fluid className="text-center py-5">
			<h1 className="display-5 fw-bold">Hire-a-Patient</h1>
			<p className="lead">Tagline goes here</p>
			<Button variant="secondary">Explore Jobs</Button>
		</Container>
	);
}

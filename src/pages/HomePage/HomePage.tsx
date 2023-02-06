import { Button, Container, Stack } from 'react-bootstrap';
import { NAV_LINKS } from '../../utils/constants';
import "./HomePage.css";

export default function HomePage() {
	return (
		<div className='homescreen'>
			<Container fluid className="text-center align-items-center">
				<Stack gap={5}>
						<h1 className="display-1 fw-bold">Hire-a-Patient</h1>
						<p className="lead">Tagline goes here</p>
				</Stack>
				<Button variant="secondary" href={NAV_LINKS.JOBS}>
					Explore Jobs
				</Button>
			</Container>
		</div>
	);
}

import {
	Button,
	ButtonGroup,
	Card,
	Container,
	Form,
	Stack,
} from 'react-bootstrap';
import PageHero from '../../components/PageHero';
import { NAV_LINKS } from '../../utils/constants';

const jobs = [
	{ id: 1, title: 'Job 1', description: 'This is job 1.' },
	{ id: 2, title: 'Job 2', description: 'This is job 2.' },
];

export default function JobsPage() {
	return (
		<Container>
			<PageHero
				title="Start your journey today"
				tagline="Look for accessible jobs that fit your needs and interests, then hit apply!"
			/>
			<Stack gap={3}>
				<Form>
					<Form.Control type="search" placeholder="Search" />
				</Form>
				{jobs.map((j) => (
					<Card key={j.id}>
						<Card.Body>
							<Card.Title>{j.title}</Card.Title>
							<Card.Text>{j.description}</Card.Text>
							<ButtonGroup>
								<Button variant="light" href={`${NAV_LINKS.JOBS}/${j.id}`}>
									View
								</Button>
								<Button>Apply</Button>
							</ButtonGroup>
						</Card.Body>
					</Card>
				))}
			</Stack>
		</Container>
	);
}

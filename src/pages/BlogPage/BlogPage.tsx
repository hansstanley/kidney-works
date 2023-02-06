import { Card, Container, Stack } from 'react-bootstrap';
import PageHero from '../../components/PageHero';

const blogs = [
	{ id: 1, title: 'Blog 1', description: 'This is blog 1.' },
	{ id: 2, title: 'Blog 2', description: 'This is blog 2.' },
	{ id: 3, title: 'Blog 3', description: 'This is blog 3.' },
];

export default function BlogPage() {
	return (
		<Container>
			<PageHero title="Blog" tagline="Make your voice heard" />
			<Stack gap={2}>
				{blogs.map((b) => (
					<Card key={b.id}>
						<Card.Body>
							<Card.Title>{b.title}</Card.Title>
							<Card.Text>{b.description}</Card.Text>
						</Card.Body>
					</Card>
				))}
			</Stack>
		</Container>
	);
}

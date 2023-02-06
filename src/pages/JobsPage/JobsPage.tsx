import { Container, Stack, Table } from 'react-bootstrap';
import PageHero from '../../components/PageHero';

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
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>No.</th>
						<th>Job Title</th>
						<th>Job Description</th>
					</tr>
				</thead>
				<tbody>
					{jobs.map((j) => (
						<tr key={j.id}>
							<td>{`${j.id}`}</td>
							<td>{j.title}</td>
							<td>{j.description}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
}

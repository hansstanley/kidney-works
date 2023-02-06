import { Container, Stack, Table } from 'react-bootstrap';

const jobs = [
	{ id: 1, title: 'Job 1', description: 'This is job 1.' },
	{ id: 2, title: 'Job 2', description: 'This is job 2.' },
];

export default function JobsPage() {
	return (
		<Container>
			<Container fluid className="py-5 text-center">
				<Stack gap={3}>
					<h1 className="display-5">Start your journey today</h1>
					<p>
						Look for accessible jobs that fit your needs and interests, then hit
						apply!
					</p>
				</Stack>
			</Container>
			<hr />
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
						<tr>
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

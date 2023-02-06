import {
	Button,
	Col,
	Container,
	Form,
	Image,
	Row,
	Stack,
} from 'react-bootstrap';
import PageHero from '../../components/PageHero';

export default function ProfilePage() {
	return (
		<Container>
			<PageHero title="Profile" />
			<Container fluid>
				<Row>
					<Col xs={3}>
						<Stack gap={3}>
							<Image
								roundedCircle
								fluid
								className="hover-shadow"
								src="https://1fid.com/wp-content/uploads/2022/07/aesthetic-profile-picture-2-1024x1024.jpg"
							/>
							<Button variant="secondary">Change</Button>
						</Stack>
					</Col>
					<Col xs={1}>
						<div className="d-flex vr h-100" />
					</Col>
					<Col>
						<Form>
							<Form.Group className="mb-3" controlId="username">
								<Form.Label>Username</Form.Label>
								<Form.Control type="username" placeholder="Username" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="fullname">
								<Form.Label>Full name</Form.Label>
								<Form.Control type="text" placeholder="Your name" />
							</Form.Group>
							<hr />
							<Button type="submit" href="#">
								Update
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

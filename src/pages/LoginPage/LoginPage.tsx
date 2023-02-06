import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import PageHero from '../../components/PageHero';

export default function LoginPage() {
	return (
		<Container style={{ height: '80vh' }}>
			<Row className="h-100">
				<Col xs={8}>
					<PageHero
						title="Welcome!"
						tagline="Sign in with one of the methods"
						noDivider
					/>
				</Col>
				<Col xs={1}>
					<div className="vr d-flex h-100" />
				</Col>
				<Col>
					<Stack gap={2} className="justify-content-center h-100">
						<Button>Sign in with Google</Button>
						<Button variant="secondary">Sign in with Email</Button>
					</Stack>
				</Col>
			</Row>
		</Container>
	);
}

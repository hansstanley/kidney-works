import { Button, Col, Container, Row } from 'react-bootstrap';

export default function LoginPage() {
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ height: '80vh' }}>
			<Row>
				<Col>
					<h3>Welcome!</h3>
					<Button>Sign in with Google</Button>
				</Col>
			</Row>
		</Container>
	);
}

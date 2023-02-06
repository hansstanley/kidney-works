import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import PageHero from '../../components/PageHero';

export default function LoginPage() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-content-center"
      style={{ height: 'calc(100vh - 56px)' }}>
      <Row>
        <Col xs={6} className="mx-auto">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Welcome</Card.Title>
              <Card.Text>Find a new career today!</Card.Text>
              <hr />
              <Button>Sign in with Google</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

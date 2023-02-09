import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../utils/constants';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: 'calc(100vh - 56px)' }}>
      <Card>
        <Card.Body>
          <Card.Title>Oops!</Card.Title>
          <Card.Text>An unexpected error has occured.</Card.Text>
          <Button onClick={() => navigate(NAV_LINKS.HOME)}>Return home</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

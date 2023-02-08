import { Button, Card, Container } from 'react-bootstrap';
import { NAV_LINKS } from '../utils/constants';

export default function ErrorPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: 'calc(100vh - 56px)' }}>
      <Card>
        <Card.Body>
          <Card.Title>Oops!</Card.Title>
          <Card.Text>An unexpected error has occured.</Card.Text>
          <Button href={NAV_LINKS.HOME}>Return home</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

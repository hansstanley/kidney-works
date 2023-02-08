import { useEffect, useMemo } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NAV_LINKS } from '../../utils/constants';
import "../Page.css";


export default function LoginPage() {
  const navigate = useNavigate();
  const { signInWithGoogle, signOutOfSession, user } = useAuth();

  const hasAuth = useMemo(() => !!user, [user]);

  useEffect(() => {
    if (hasAuth) {
      navigate(NAV_LINKS.HOME);
    }
  }, [hasAuth, navigate]);

  return (
    <Container
      className="d-flex flex-column justify-content-center align-content-center background"
      style={{ height: 'calc(100vh - 56px)' }}>
      <Row>
        <Col xs={6} className="mx-auto">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <h1 className="display-5">Welcome</h1>
              </Card.Title>
              <Card.Text>
                {hasAuth
                  ? `You have already signed in as ${user?.displayName}.`
                  : 'Find a new career today!'}
              </Card.Text>
              <hr />
              {hasAuth ? (
                <Button variant="secondary" onClick={signOutOfSession}>
                  Sign out
                </Button>
              ) : (
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

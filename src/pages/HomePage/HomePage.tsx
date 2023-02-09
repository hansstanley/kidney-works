import './HomePage.css';
import { Button, Container, Stack } from 'react-bootstrap';
import { NAV_LINKS } from '../../utils/constants';
import { animated, useSpring } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const props = useSpring({
    from: { backgroundColor: '#ffffff' },
    to: { backgroundColor: '#ffffff00' },
    delay: 500,
    config: { duration: 2000 },
  });

  return (
    <animated.div style={props} className="homescreen">
      <Container fluid className="text-center align-items-center">
        <Stack gap={5}>
          <h1 className="display-1 fw-bold">Hire-a-Patient</h1>
          <p className="lead">
            Empowering dialysis patients, enriching the workforce
          </p>
        </Stack>
        <Button variant="primary" onClick={() => navigate(NAV_LINKS.JOBS)}>
          Explore Jobs
        </Button>
      </Container>
    </animated.div>
  );
}

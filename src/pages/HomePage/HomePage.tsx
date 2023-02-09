import './HomePage.css';
import { Button, Container, Stack } from 'react-bootstrap';
import { NAV_LINKS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import AnimatedBackground from '../../components/AnimatedBackground';
import { useAuth } from '../../hooks/useAuth';
import useUserInfo from '../../hooks/useUserInfo';
import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import HomeFeature from './HomeFeature';

const AnimatedButton = animated(Button);

export default function HomePage() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const { x } = useSpring({
    from: { x: 0 },
    to: { x: clicked ? 0 : 1 },
    config: { duration: 1000 },
  });

  const [exploreSpring, exploreApi] = useSpring(() => ({ from: { scale: 1 } }));

  const [circleSpring, circleApi] = useSpring(() => ({
    from: { width: '0vw', height: '0vh', borderRadius: '50vw', opacity: 1 },
  }));

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleExploreClick = () => {
    exploreApi.start({ to: { scale: 0 } });
    circleApi.start({
      to: {
        width: '100vw',
        height: '100vh',
        borderRadius: '0',
        opacity: 0,
      },
    });
    setTimeout(() => navigate(NAV_LINKS.JOBS), 500);
  };

  const { user } = useAuth();
  const { created } = useUserInfo();

  console.log(created);
  console.log(user ? 1 : 0);

  return (
    <AnimatedBackground>
      <Page>
        <div className="homescreen">
          <Container fluid className="text-center align-items-center">
            <Stack gap={5}>
              <animated.div
                style={{
                  opacity: x.to({ range: [0, 1], output: [0.5, 1] }),
                  scale: x.to({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.97, 0.95, 1, 0.95, 1, 0.95, 1],
                  }),
                  cursor: 'pointer',
                }}
                onClick={handleClick}>
                <h1 className="display-1 fw-bold">Hire-a-Patient</h1>
              </animated.div>
              <p className="lead">
                Empowering dialysis patients, enriching the workforce
              </p>
            </Stack>
            <AnimatedButton
              style={exploreSpring}
              variant="primary"
              onClick={handleExploreClick}>
              Explore Jobs
            </AnimatedButton>
          </Container>
        </div>
        <HomeFeature />
      </Page>
      <animated.div
        className="bg-primary position-fixed top-50 start-50 translate-middle"
        style={circleSpring}
      />
    </AnimatedBackground>
  );
}

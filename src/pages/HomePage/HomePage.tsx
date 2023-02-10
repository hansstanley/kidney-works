import './HomePage.css';
import { Button, ButtonGroup, Container, Stack } from 'react-bootstrap';
import { APP_IDENTITY, NAV_LINKS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import AnimatedBackground from '../../components/AnimatedBackground';
import { useRef, useState } from 'react';
import { animated, useScroll, useSpring } from '@react-spring/web';
import HomeFeature from './HomeFeature';
import ImageSlider from '../../components/ImageSlider';
import HomeLinks from './HomeLinks';
import HomeRationale from './HomeRationale';

const AnimatedButton = animated(Button);

export default function HomePage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [clicked, setClicked] = useState(false);
  const moreInfoRef = useRef<HTMLDivElement>(null);

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

  const handleMoreInfoClick = () => {
    moreInfoRef.current?.scrollIntoView();
  };

  return (
    <AnimatedBackground>
      <Page>
        <div className="homescreen">
          <Container fluid className="text-center align-items-center">
            <Stack gap={5} className="align-items-center">
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
                <animated.h1
                  className="display-1 fw-bold position-absolute"
                  style={{
                    transform: scrollY.to(
                      (y) => `translate(3px, ${3 - y * 0.2}px)`,
                    ),
                    zIndex: 1,
                  }}>
                  {APP_IDENTITY.TITLE}
                </animated.h1>
                <h1
                  className="display-1 fw-bold text-primary position-relative"
                  style={{ zIndex: 2 }}>
                  {APP_IDENTITY.TITLE}
                </h1>
              </animated.div>
              <p className="lead">{APP_IDENTITY.TAGLINE}</p>
            </Stack>
            <ButtonGroup className="mt-5">
              <AnimatedButton
                style={exploreSpring}
                variant="primary"
                onClick={handleExploreClick}>
                Explore Jobs
              </AnimatedButton>
              <Button variant="secondary" onClick={handleMoreInfoClick}>
                Learn more
              </Button>
            </ButtonGroup>
          </Container>
        </div>
        <div ref={moreInfoRef} />
        <HomeRationale />
        <HomeFeature />
        <ImageSlider />
        <HomeLinks />
      </Page>
      <animated.div
        className="bg-primary position-fixed top-50 start-50 translate-middle"
        style={circleSpring}
      />
    </AnimatedBackground>
  );
}

import './HomePage.css';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { NAV_LINKS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import AnimatedBackground from '../../components/AnimatedBackground';
import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

const AnimatedButton = animated(Button);

export default function HomePage() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [exploreClicked, setExploreClicked] = useState(false);

  const { x } = useSpring({
    from: { x: 0 },
    to: { x: clicked ? 0 : 1 },
    config: { duration: 1000 },
  });

  const exploreSpring = useSpring({
    from: { scale: 1 },
    to: { scale: exploreClicked ? 0 : 1 },
  });

  const circleSpring = useSpring({
    from: { width: '0vw', height: '0vh', borderRadius: '50vw', opacity: 1 },
    to: exploreClicked
      ? {
          width: '100vw',
          height: '100vh',
          borderRadius: '0',
          opacity: 0,
        }
      : { width: '0vw', height: '0vh', borderRadius: '50vw', opacity: 1 },
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleExploreClick = () => {
    setExploreClicked(true);
    setTimeout(() => navigate(NAV_LINKS.JOBS), 500);
  };

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
            <animated.div
              className="bg-primary position-absolute top-50 start-50 translate-middle"
              style={circleSpring}
            />
          </Container>
        </div>
        <Page.Body noCard>
          <Row>
            <Col>
              <Card>
                <Card.Header>Empower</Card.Header>
                <Card.Body>
                  <Card.Subtitle>
                    Platform to share patients' experiences, challenges, and
                    triumphs
                  </Card.Subtitle>
                  <hr />
                  <Card.Text>
                    Empowering patients to share their stories can help build a
                    supportive community where they can connect with others who
                    are facing similar challenges. These stories can serve as a
                    source of inspiration and encouragement for others, helping
                    to build resilience and hope.
                    <br />
                    <br />
                    The blog can also serve as an educational resource for
                    people who are interested in learning more about life with
                    kidney disease and dialysis, increasing awareness and
                    understanding of the disease and the experiences of those
                    who live with it.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Connect</Card.Header>
                <Card.Body>
                  <Card.Subtitle>
                    Bridging the gap between employers and patients
                  </Card.Subtitle>
                  <hr />
                  <Card.Text>
                    By offering a platform that is specifically tailored to the
                    needs of kidney dialysis patients, Hire-a-Patient can help
                    patients overcome the challenges they may face in the job
                    search process, such as limited mobility, scheduling
                    conflicts, and medical restrictions.
                    <br />
                    <br />
                    They can also obtain resources and support to help them
                    succeed in the workplace, such as information on
                    accommodations and flexible work arrangements.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Apply</Card.Header>
                <Card.Body>
                  <Card.Subtitle>More manageable, less stressful</Card.Subtitle>
                  <hr />
                  <Card.Text>
                    Hire-a-Patient offers job listings from employers who
                    understand the challenges and limitations faced by dialysis
                    patients, and are willing to make necessary accommodations.
                    This means that job seekers can apply for positions with
                    confidence, knowing that their medical needs will be taken
                    into consideration.
                    <br />
                    <br />
                    By leveraging the power of technology and connecting with a
                    supportive community, dialysis patients can find meaningful
                    employment and take control of their careers.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Page.Body>
      </Page>
    </AnimatedBackground>
  );
}

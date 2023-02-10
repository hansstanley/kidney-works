import { Page } from '../../components/Page';
import { useAuth } from '../../hooks/useAuth';
import useUserInfo from '../../hooks/useUserInfo';
import './AboutPage.css';
import { Badge, Card, Image } from 'react-bootstrap';
import kidneyWork from '../../images/kidneywork.jpg';

export default function AboutPage() {

  const { signOutOfSessionWithoutReload } = useAuth();

  const { created, fetched } = useUserInfo();
  if (!created && fetched) {
    signOutOfSessionWithoutReload();
  }

  return (
    <Page>
      <Page.Header
        noDivider
        title="About"
        tagline="Empowering dialysis patients, enriching the workforce"
      />
      <Page.Body>
        <h2 className="position-absolute top-0 start-50 translate-middle">
          <Badge>Our Mission</Badge>
        </h2>
        <h6 className="mt-3">
          <Card.Text>
            Our mission is to bridge the gap between employers looking for
            qualified and motivated employees and patients seeking meaningful
            employment opportunities.
          </Card.Text>
          <Card.Text>
            With our platform, employers can access a pool of skilled and
            dedicated employees, and patients can take control of their careers,
            financial stability, and quality of life.
          </Card.Text>
        </h6>
      </Page.Body>
      <Page.Body>
        <h2 className="position-absolute top-0 start-50 translate-middle">
          <Badge>Our Vision</Badge>
        </h2>
        <h6 className="mt-3">
          <Card.Text>
            Our job portal is dedicated to connecting employers with kidney
            dialysis patients, providing a platform for patients to find
            employment opportunities that are flexible and accommodating to
            their medical needs. We believe that every individual, including
            dialysis patients, has the right to work and contribute to society,
            and our goal is to make this a reality.
          </Card.Text>
        </h6>
      </Page.Body>
      <Page.Body className="text-center">
        <Image src={kidneyWork} style={{ maxWidth: '100%', height: 'auto' }} />
        <h5>
          Join us in creating a more inclusive and equitable job market, where
          everyone has an equal opportunity to succeed!
        </h5>
      </Page.Body>
    </Page>
  );
}

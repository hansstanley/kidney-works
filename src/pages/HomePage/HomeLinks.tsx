import { Card, Col, Container, Row } from 'react-bootstrap';
import Page from '../../components/Page';
import { MdLaunch } from 'react-icons/md';

const links = [
  { title: 'KDF Official page', url: 'https://www.kdf.org.sg/' },
  { title: 'KDF Brochures', url: 'https://www.kdf.org.sg/brochures' },
  { title: 'KDF Adopt-A-Patient', url: 'https://www.kdf.org.sg/adopt' },
  {
    title: 'NKF Key Statistics',
    url: 'https://nkfs.org/about-us/key-statistics/',
  },
  {
    title: 'NKF Outreach Programmes',
    url: 'https://nkfs.org/outreach-programmes/',
  },
  {
    title: 'What is Dialysis - SingHealth',
    url: 'https://www.singhealth.com.sg/patient-care/conditions-treatments/dialysis',
  },
  {
    title: 'Kidney Failure - HealthHub',
    url: 'https://www.healthhub.sg/a-z/diseases-and-conditions/664/kidney-failure',
  },
  {
    title: 'Kidney Tsunami - CNA',
    url: 'https://www.channelnewsasia.com/singapore/nkf-kidney-failure-tsunami-dialysis-2936766',
  },
  {
    title: 'Breaking down employment barriers - Straits Times',
    url: 'https://www.straitstimes.com/opinion/forum/forum-breaking-down-barriers-to-employment-for-dialysis-patients',
  },
];

export default function HomeLinks() {
  return (
    <Page.Body noCard>
      <Container className="text-center">
        <h2 className="my-5">Useful links</h2>
        <Row>
          {links.map((link, i) => (
            <Col key={i} sm={6} md={3} className="my-3">
              <Card>
                <MdLaunch
                  size={24}
                  className="position-absolute"
                  style={{ top: 4, right: 4 }}
                />
                <Card.Body className="mt-3">
                  <Card.Subtitle>{link.title}</Card.Subtitle>
                  <Card.Link
                    title={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    {link.url}
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Page.Body>
  );
}

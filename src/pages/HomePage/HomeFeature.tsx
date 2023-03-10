import {
  Accordion,
  Badge,
  Card,
  Col,
  Container,
  Row,
  Stack,
} from 'react-bootstrap';
import { APP_IDENTITY } from '../../utils/constants';

const features = [
  {
    title: 'Empower',
    subtitle:
      "Platform to share patients' experiences, challenges, and triumphs",
    body: [
      'Empowering patients to share their stories can help build asupportive community where they can connect with others who are facing similar challenges. These stories can serve as a source of inspiration and encouragement for others, helping to build resilience and hope.',
      'The blog can also serve as an educational resource for people who are interested in learning more about life with kidney disease and dialysis, increasing awareness and understanding of the disease and the experiences of those who live with it.',
    ],
  },
  {
    title: 'Connect',
    subtitle: 'Bridging the gap between employers and patients',
    body: [
      `By offering a platform that is specifically tailored to the needs of kidney dialysis patients, ${APP_IDENTITY.TITLE} can help patients overcome the challenges they may face in the job search process, such as limited mobility, scheduling conflicts, and medical restrictions.`,
      'They can also obtain resources and support to help them succeed in the workplace, such as information on accommodations and flexible work arrangements.',
    ],
  },
  {
    title: 'Apply',
    subtitle: 'More manageable, less stressful',
    body: [
      `${APP_IDENTITY.TITLE} offers job listings from employers who understand the challenges and limitations faced by dialysis patients, and are willing to make necessary accommodations. This means that job seekers can apply for positions with confidence, knowing that their medical needs will be taken into consideration.`,
      'By leveraging the power of technology and connecting with a supportive community, dialysis patients can find meaningful employment and take control of their careers.',
    ],
  },
];

interface FeatureBoxProps {
  title: string;
  subtitle: string;
  body: string[];
}

function FeatureBox({ title, subtitle, body }: FeatureBoxProps) {
  return (
    <Card>
      <h3
        className="position-absolute start-50 top-0 translate-middle text-center"
        style={{ minWidth: '70%' }}>
        <Badge>{title}</Badge>
      </h3>
      <Card.Body className="mt-3">
        <Card.Subtitle>{subtitle}</Card.Subtitle>
        <Accordion className="mt-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Read more</Accordion.Header>
            <Accordion.Body>
              {body.map((b, i) => (
                <Card.Text key={i} className="text-start">
                  {b}
                </Card.Text>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
}

export default function HomeFeature() {
  return (
    <Container className="text-center my-5">
      <Stack gap={5}>
        <h2>Features</h2>
        <Row>
          {features.map(({ title, subtitle, body }, i) => (
            <Col key={i} className="my-3" sm={12} md={4}>
              <FeatureBox title={title} subtitle={subtitle} body={body} />
            </Col>
          ))}
        </Row>
      </Stack>
    </Container>
  );
}

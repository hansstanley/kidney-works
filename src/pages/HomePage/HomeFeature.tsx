import { Card, Col, Row } from 'react-bootstrap';
import Page from '../../components/Page';

export default function HomeFeature() {
  return (
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
                supportive community where they can connect with others who are
                facing similar challenges. These stories can serve as a source
                of inspiration and encouragement for others, helping to build
                resilience and hope.
                <br />
                <br />
                The blog can also serve as an educational resource for people
                who are interested in learning more about life with kidney
                disease and dialysis, increasing awareness and understanding of
                the disease and the experiences of those who live with it.
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
                patients overcome the challenges they may face in the job search
                process, such as limited mobility, scheduling conflicts, and
                medical restrictions.
                <br />
                <br />
                They can also obtain resources and support to help them succeed
                in the workplace, such as information on accommodations and
                flexible work arrangements.
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
                Hire-a-Patient offers job listings from employers who understand
                the challenges and limitations faced by dialysis patients, and
                are willing to make necessary accommodations. This means that
                job seekers can apply for positions with confidence, knowing
                that their medical needs will be taken into consideration.
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
  );
}

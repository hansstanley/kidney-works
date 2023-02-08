import { Card, Container, Stack } from 'react-bootstrap';
import PageHero from '../../components/PageHero';
import "../Page.css";

export default function AboutPage() {
  return (
    <div className='background'>
      <Container className="text-center align-items-center">
        <Stack gap={3}>
          <PageHero
            title="About"
            tagline="Empowering dialysis patients, enriching the workforce"
          />
          <Card>
            <Card.Body>
              <Card.Text className="text-start">
                Our job portal is dedicated to connecting employers with kidney
                dialysis patients, providing a platform for patients to find
                employment opportunities that are flexible and accommodating to
                their medical needs. We believe that every individual, including
                dialysis patients, has the right to work and contribute to
                society, and our goal is to make this a reality. Our mission is
                to bridge the gap between employers looking for qualified and
                motivated employees and patients seeking meaningful employment
                opportunities. With our platform, employers can access a pool of
                skilled and dedicated employees, and patients can take control
                of their careers, financial stability, and quality of life. Join
                us in creating a more inclusive and equitable job market, where
                everyone has an equal opportunity to succeed.
              </Card.Text>
            </Card.Body>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}

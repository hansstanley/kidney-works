import './AboutPage.css';
import { Badge, Card, Image, Stack } from 'react-bootstrap';
import { Page, PageBody, PageHeader } from '../../components/Page';
import kidneyWork from '../../images/kidneywork.jpg';

export default function AboutPage() {
  return (
    <Page>
      <PageHeader
        noDivider
        title="About"
        tagline="Empowering dialysis patients, enriching the workforce"
      />
      <PageBody>
        <Stack gap={3}>
        <Card>
          <Card.Header>
            <div className="title">
              <h2>
                <Badge>
                    Our  Mission
                </Badge>
              </h2>
            </div>
          </Card.Header>
          <Card.Body>
            <h5>
            <Card.Text>
              Our mission is to bridge the gap between employers looking for qualified and
              motivated employees and patients seeking meaningful employment
              opportunities. 
            </Card.Text>
            <Card.Text>
              With our platform, employers can access a pool of
              skilled and dedicated employees, and patients can take control of
              their careers, financial stability, and quality of life. 
            </Card.Text>
            </h5>
            
          </Card.Body>
          <Card.Img src=' ' />
        </Card>
        <Card>
        <Card.Header>
            <div className="title">
              <h2>
                <Badge>
                   Our Vision
                </Badge>
              </h2>
            </div>
          </Card.Header>
          <h5>
          <Card.Body>
              Our job portal is dedicated to connecting employers with kidney
              dialysis patients, providing a platform for patients to find
              employment opportunities that are flexible and accommodating to
              their medical needs. We believe that every individual, including
              dialysis patients, has the right to work and contribute to
              society, and our goal is to make this a reality. 
          </Card.Body>
          </h5>
        </Card>
        </Stack>
      </PageBody>
      <div className='banner'>
        <Image src={kidneyWork}></Image>
        <h3>Join us
              in creating a more inclusive and equitable job market, where
              everyone has an equal opportunity to succeed!
        </h3>
        <hr/>
      </div>
    </Page>
  );
}

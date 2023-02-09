import './HomePage.css';
import { Button, Container, Stack } from 'react-bootstrap';
import { NAV_LINKS } from '../../utils/constants';
import { animated, useSpring } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import AnimatedBackground from '../../components/AnimatedBackground';

export default function HomePage() {
  const navigate = useNavigate();
  const props = useSpring({
    from: { backgroundColor: '#ffffff' },
    to: { backgroundColor: '#ffffff00' },
    delay: 500,
    config: { duration: 2000 },
  });

  return (
    <AnimatedBackground>
      <Page>
        <div className="homescreen">
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
        </div>
        <Page.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          tristique viverra ullamcorper. Sed scelerisque lacus a sodales
          suscipit. Fusce scelerisque accumsan mauris, id porttitor nisi
          vestibulum vitae. Ut tincidunt blandit enim ut pharetra. Phasellus
          blandit laoreet dignissim. Vestibulum ullamcorper sodales faucibus.
          Suspendisse laoreet lobortis odio, nec iaculis tellus elementum et.
          Curabitur eu volutpat sapien. Aliquam leo odio, eleifend nec varius
          eget, finibus eget turpis. Praesent vel ex posuere nisl iaculis
          ultricies malesuada at metus. In in elit ut leo cursus malesuada.
          Morbi vel malesuada libero, elementum dignissim velit. Nam nec sapien
          sed diam consequat aliquam a in nisl. Nunc viverra, lorem vel
          dignissim tincidunt, felis ipsum vulputate ex, at aliquam neque lectus
          sit amet est. Sed ut commodo nulla, ac varius nisl. Nam ullamcorper
          nisl sit amet mauris scelerisque sagittis. Suspendisse eleifend, augue
          non porttitor semper, erat metus dapibus ante, at tristique ex nunc id
          mi. Duis mattis porta fringilla. Fusce scelerisque odio tristique
          lorem auctor faucibus. Etiam tempus sapien vitae nibh viverra, et
          auctor mauris sollicitudin. In in gravida velit. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Maecenas iaculis maximus lorem
          ac ultrices. Proin vestibulum ullamcorper sem, non cursus enim auctor
          vitae. Vivamus dapibus sem ac ante auctor suscipit sit amet nec felis.
          Etiam porttitor orci mollis mauris viverra vehicula. Pellentesque sit
          amet pulvinar justo, vel consectetur lectus. Aenean quis ornare enim.
          Vivamus maximus id justo ut vulputate. Sed porta, ex at maximus
          rhoncus, quam nunc sagittis arcu, sit amet elementum massa nisl ac
          sapien. Quisque est purus, sodales vitae mollis a, aliquam eget dui.
        </Page.Body>
      </Page>
    </AnimatedBackground>
  );
}

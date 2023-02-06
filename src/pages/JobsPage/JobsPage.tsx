import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Form,
  Stack,
} from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import AppJob from '../../types/job.app';
import { NAV_LINKS } from '../../utils/constants';

export default function JobsPage() {
  const jobs = useLoaderData() as AppJob[];

  return (
    <Container className="pb-5">
      <PageHero
        title="Start your journey today"
        tagline="Look for accessible jobs that fit your needs and interests, then hit apply!"
      />
      <Stack gap={3}>
        <Form>
          <Form.Control type="search" placeholder="Search" />
        </Form>
        {jobs.map((j) => (
          <Card key={j.id}>
            <Card.Body>
              <Card.Title>{j.title}</Card.Title>
              <Card.Text>{j.description}</Card.Text>
              <ButtonGroup>
                <Button variant="light" href={`${NAV_LINKS.JOBS}/${j.id}`}>
                  View
                </Button>
                <Button>Apply</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

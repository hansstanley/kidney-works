import { useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import AppJob from '../../types/job.app';
import { NAV_LINKS } from '../../utils/constants';

export default function JobDetailPage() {
  const job = useLoaderData() as AppJob;

  return (
    <Container>
      {job ? (
        <>
          <PageHero title={job.title} tagline={job.company} />
          <Card>
            <Card.Body>
              <Card.Text>{job.description}</Card.Text>
              <hr />
              <Button>Apply</Button>
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <PageHero title="Oops!" />
          <Card>
            <Card.Body>
              <Card.Text>
                This job does not exist or has been deleted, please try a
                different job.
              </Card.Text>
              <Button href={NAV_LINKS.JOBS}>Return to job list</Button>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}

import { useMemo, useState } from 'react';
import { Button, ButtonGroup, Card, Container, Stack } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import AppJob from '../../types/job.app';
import { NAV_LINKS } from '../../utils/constants';
import { JobFormModal } from '../JobsPage';

export default function JobDetailPage() {
  const [showForm, setShowForm] = useState(false);
  const job = useLoaderData() as AppJob;

  const hasJob = useMemo(() => !!job, [job]);

  const handleShowEditForm = () => {
    setShowForm(true);
  };

  const handleHideEditForm = () => {
    setShowForm(false);
  };

  return (
    <Container>
      {hasJob ? (
        <PageHero title={job.title} tagline={job.company} />
      ) : (
        <PageHero title="Oops!" />
      )}
      <Stack gap={4}>
        <Button
          variant="secondary"
          href={NAV_LINKS.JOBS}
          className="align-self-start">
          Back to jobs list
        </Button>
        {hasJob ? (
          <Card>
            <Card.Body>
              <Card.Text>{job.description}</Card.Text>
              <hr />
              <ButtonGroup>
                <Button variant="light" onClick={handleShowEditForm}>
                  Edit
                </Button>
                <Button>Apply</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>
                This job does not exist or has been deleted, please try a
                different job.
              </Card.Text>
              <Button href={NAV_LINKS.JOBS}>Return to job list</Button>
            </Card.Body>
          </Card>
        )}
      </Stack>
      <JobFormModal job={job} show={showForm} onHide={handleHideEditForm} />
    </Container>
  );
}

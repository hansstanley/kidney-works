import { useState } from 'react';
import { Button, ButtonGroup, Card, Container, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import { useAuth } from '../../hooks/useAuth';
import useJobs from '../../hooks/useJobs';
import { NAV_LINKS } from '../../utils/constants';
import { JobFormModal } from '../JobsPage';

export default function JobDetailPage() {
  const { user } = useAuth();
  const { jobId } = useParams();
  const { findJob, isJobApplied } = useJobs();
  const job = findJob(jobId);
  const [showForm, setShowForm] = useState(false);

  const hasJob = !!job;
  const hasApplied = isJobApplied(user?.uid)(jobId || '');

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
              <Card.Title>Description</Card.Title>
              <Card.Text>{job.description}</Card.Text>
              <hr />
              <Card.Title>Job requirements</Card.Title>
              <Card.Text>{job.requirements || 'Nothing here.'}</Card.Text>
              <hr />
              <ButtonGroup>
                <Button variant="light" onClick={handleShowEditForm}>
                  Edit
                </Button>
                {hasApplied ? null : <Button>Apply</Button>}
              </ButtonGroup>
            </Card.Body>
          </Card>
        ) : (
          <MissingJobPlaceholder />
        )}
      </Stack>
      <JobFormModal job={job} show={showForm} onHide={handleHideEditForm} />
    </Container>
  );
}

function MissingJobPlaceholder() {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          This job does not exist or has been deleted, please try a different
          job.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

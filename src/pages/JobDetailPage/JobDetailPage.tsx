import { useState } from 'react';
import { Button, ButtonGroup, Card, Container, Stack } from 'react-bootstrap';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import { loadAppliedStatus, loadJob } from '../../features/job/loaders';
import AppJobApplication from '../../types/job-application.app';
import AppJob from '../../types/job.app';
import { NAV_LINKS } from '../../utils/constants';
import { JobFormModal } from '../JobsPage';

interface JobDetailPageData {
  job?: AppJob;
  app?: AppJobApplication;
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<JobDetailPageData> {
  const jobId = parseInt(params.jobId || '') || -1;
  const [job, app] = await Promise.all([
    loadJob(jobId),
    loadAppliedStatus(jobId),
  ]);
  return { job, app };
}

export default function JobDetailPage() {
  const [showForm, setShowForm] = useState(false);
  const { job, app } = useLoaderData() as JobDetailPageData;

  const hasJob = !!job;
  const hasApplied = !!app;

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
              <Card.Title>Special requirements</Card.Title>
              <Card.Text>
                {job.specialRequirements || 'Nothing here.'}
              </Card.Text>
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

import { useState } from 'react';
import { Button, ButtonGroup, Card, Container, Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Page, PageBody, PageHeader } from '../../components/Page';
import PageHero from '../../components/PageHero';
import { useAuth } from '../../hooks/useAuth';
import useJobs from '../../hooks/useJobs';
import { NAV_LINKS } from '../../utils/constants';
import { JobFormModal } from '../JobsPage';


export default function JobDetailPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobId } = useParams();
  const { findJob, isJobApplied, findJobApplicationsForEmployer } = useJobs();
  const job = findJob(jobId);
  const [showForm, setShowForm] = useState(false);

  const apps = findJobApplicationsForEmployer(jobId);

  const hasJob = !!job;

  const handleShowEditForm = () => {
    setShowForm(true);
  };

  const handleHideEditForm = () => {
    setShowForm(false);
  };




  return (
    <Page>
      {hasJob ? (
        <PageHeader noDivider title={job.title} tagline={job.company} />
      ) : (
        <PageHeader noDivider title="Oops!" />
      )}
      <PageBody>
        <Stack gap={4}>
          <Button
            variant="secondary"
            onClick={() => navigate(NAV_LINKS.JOBS)}
            className="align-self-start">
            Back to jobs list
          </Button>
          {hasJob ? (
            <Stack gap={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Description</Card.Title>
                  <Card.Text>{job.description}</Card.Text>
                  <hr />
                  <Card.Title>Job requirements</Card.Title>
                  <Card.Text>{job.requirements || 'Nothing here.'}</Card.Text>
                  <hr />
                  {/* <ButtonGroup>
                    <Button variant="light" onClick={handleShowEditForm}>
                      Edit
                    </Button>
                    {hasApplied ? null : <Button>Apply</Button>}
                  </ButtonGroup> */}
                </Card.Body>
              </Card>
              <Card>
                
                <Card.Body>
                <Card.Title>Applications</Card.Title>
                <hr />
                {apps.length === 0 ?
                  <Card>
                  <Card.Body>  
                    <Card.Body>
                      <Card.Text>
                        No applications right now. Check back later.
                      </Card.Text>
                    </Card.Body>
                  </Card.Body>
                </Card>
                : apps.map((app) => (
                  <Card>
                    <Card.Body>  
                      <Card.Title>Name</Card.Title>
                      <Card.Text>{app.userName}</Card.Text>
                      <hr />
                      <Card.Title>Applicant's Additional Notes</Card.Title>
                      <Card.Text>{app.addNote || 'Nothing here.'}</Card.Text>
                      <hr />
                      <Button>
                        Contact
                      </Button>
                    </Card.Body>
                  </Card>
                 ))
                }
                </Card.Body>
              </Card>
              
            </Stack>
          ) : (
            <MissingJobPlaceholder />
          )}
        </Stack>
        <JobFormModal job={job} show={showForm} onHide={handleHideEditForm} />
      </PageBody>
    </Page>
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

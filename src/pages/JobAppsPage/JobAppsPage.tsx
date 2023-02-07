import { Button, Container, Stack } from 'react-bootstrap';
import PageHero from '../../components/PageHero';
import { useAuth } from '../../hooks/useAuth';
import useJobs from '../../hooks/useJobs';
import { NAV_LINKS } from '../../utils/constants';
import { JobsList } from '../JobsPage';

export default function JobAppsPage() {
  const { user } = useAuth();
  const { findAppliedJobs, findJobApplications } = useJobs();

  const jobs = findAppliedJobs(user?.uid);
  const applications = findJobApplications(user?.uid);

  return (
    <Container>
      <PageHero title="My Applications" tagline="Track your job applications" />
      <Stack gap={3}>
        <Button className="align-self-start" href={NAV_LINKS.JOBS}>
          Apply for more
        </Button>
        <JobsList jobs={jobs} jobApplications={applications} hideActions />
      </Stack>
    </Container>
  );
}

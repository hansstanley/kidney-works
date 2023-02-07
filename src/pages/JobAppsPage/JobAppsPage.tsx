import { Container } from 'react-bootstrap';
import PageHero from '../../components/PageHero';
import { useAuth } from '../../hooks/useAuth';
import useJobs from '../../hooks/useJobs';
import { JobsList } from '../JobsPage';

export default function JobAppsPage() {
  const { user } = useAuth();
  const { findAppliedJobs, findJobApplications } = useJobs();

  const jobs = findAppliedJobs(user?.uid);
  const applications = findJobApplications(user?.uid);

  return (
    <Container>
      <PageHero title="My Applications" tagline="Track your job applications" />
      <JobsList jobs={jobs} jobApplications={applications} hideActions />
    </Container>
  );
}

import { Container } from 'react-bootstrap';
import PageHero from '../../components/PageHero';
import useJobs from '../../hooks/useJobs';
import { JobsList } from '../JobsPage';

export default function JobAppsPage() {
  const { jobs } = useJobs();

  return (
    <Container>
      <PageHero title="My Applications" tagline="Track your job applications" />
      {/* TODO: pass in list of applied statuses */}
      <JobsList jobs={jobs} appliedStatuses={undefined} hideActions />
    </Container>
  );
}

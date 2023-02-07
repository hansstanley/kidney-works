import { Container } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import PageHero from '../../components/PageHero';
import { loadApplied, loadAppliedStatuses } from '../../features/job/loaders';
import AppJobApplication from '../../types/job-application.app';
import AppJob from '../../types/job.app';
import { JobsList } from '../JobsPage';

export interface JobAppsPageData {
  jobs: AppJob[];
  apps: AppJobApplication[];
}

export async function loader(): Promise<JobAppsPageData> {
  const [jobs, apps] = await Promise.all([
    loadApplied(),
    loadAppliedStatuses(),
  ]);
  return { jobs, apps };
}

export default function JobAppsPage() {
  const { jobs, apps } = useLoaderData() as JobAppsPageData;

  return (
    <Container>
      <PageHero title="My Applications" tagline="Track your job applications" />
      <JobsList jobs={jobs} appliedStatuses={apps} hideActions />
    </Container>
  );
}

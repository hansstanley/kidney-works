import { LoaderFunctionArgs } from 'react-router-dom';
import AppJobApplication from '../../types/job-application.app';
import AppJob from '../../types/job.app';

const jobs: AppJob[] = [
  {
    id: 1,
    title: 'Job 1',
    company: 'Some company',
    description: 'This is a description of job 1.',
  },
  {
    id: 2,
    title: 'Job 2',
    company: 'Some company',
    description: 'This is a description of job 2.',
  },
  {
    id: 3,
    title: 'Job 3',
    company: 'Some company',
    description: 'This is a description of job 3.',
  },
];

const jobStatuses: AppJobApplication[] = [
  { jobId: 2, status: 'reviewed' },
  { jobId: 3, status: 'accepted' },
];

export async function loadOne({ params }: LoaderFunctionArgs) {
  const jobId = parseInt(params.jobId || '');
  if (isNaN(jobId)) {
    return null;
  }
  return jobs.find((j) => j.id === jobId) || null;
}

export async function loadAll() {
  return jobs;
}

export async function loadApplied() {
  return jobs.filter((j) => jobStatuses.map((s) => s.jobId).includes(j.id));
}

export async function loadAppliedStatuses() {
  return jobStatuses;
}

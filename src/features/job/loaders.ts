import { LoaderFunctionArgs } from 'react-router-dom';
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

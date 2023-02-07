import { useCallback, useMemo, useState } from 'react';
import UseJobs from '../../hooks/useJobs';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import PageHero from '../../components/PageHero';
import AppJob from '../../types/job.app';
import JobFormModal from './JobFormModal';
import JobsList from './JobsList';

export default function JobsPage() {
  const { jobs, setJobsState } = UseJobs();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const handleShowCreateForm = () => {
    setShowForm(true);
  };

  const handleHideCreateForm = () => {
    setShowForm(false);
  };
  console.log(jobs)
  const filterJob = useCallback(
    (job: AppJob) => {
      if (!search) {
        return true;
      }
      const lowerSearch = search.toLowerCase();
      return [
        job.title,
        job.description,
        job.company,
        job.requirements,
      ]
        .map((x) => x?.toLowerCase())
        .some((x) => x?.includes(lowerSearch));
    },
    [search],
  );

  const visibleJobs = useMemo(() => jobs.filter(filterJob), [jobs, filterJob]);

  return (
    <Container className="pb-5">
      <PageHero
        title="Start your journey today"
        tagline="Look for accessible jobs that fit your needs and interests, then hit apply!"
      />
      <Stack gap={3}>
        <Button className="align-self-end" onClick={handleShowCreateForm}>
          Create a new job
        </Button>
        <Form>
          <Form.Control
            type="search"
            placeholder="Search"
            className="w-50"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Form>
        <JobsList jobs={visibleJobs} />
      </Stack>
      <JobFormModal show={showForm} onHide={handleHideCreateForm} jobs={jobs} setJobsState={setJobsState}/>
    </Container>
  );
}

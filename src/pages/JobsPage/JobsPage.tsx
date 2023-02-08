import { useCallback, useMemo, useState } from 'react';
import useJobs from '../../hooks/useJobs';
import { Button, Form, Stack } from 'react-bootstrap';
import AppJob from '../../types/job.app';
import JobFormModal from './JobFormModal';
import JobsList from './JobsList';
import { useAuth } from '../../hooks/useAuth';
import { Page, PageBody, PageHeader } from '../../components/Page';

export default function JobsPage() {
  const { user } = useAuth();
  const { jobs, setJobsState, findJobApplications } = useJobs();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const applications = findJobApplications(user?.uid);

  const handleShowCreateForm = () => {
    setShowForm(true);
  };

  const handleHideCreateForm = () => {
    setShowForm(false);
  };
  console.log(jobs);
  const filterJob = useCallback(
    (job: AppJob) => {
      if (!search) {
        return true;
      }
      const lowerSearch = search.toLowerCase();
      return [job.title, job.description, job.company, job.requirements]
        .map((x) => x?.toLowerCase())
        .some((x) => x?.includes(lowerSearch));
    },
    [search],
  );

  const visibleJobs = useMemo(() => jobs?.filter(filterJob), [jobs, filterJob]);

  return (
    <Page>
      <PageHeader
        noDivider
        title="Start your journey today"
        tagline="Look for accessible jobs that fit your needs and interests, then hit apply!"
      />
      <PageBody>
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
          <JobsList jobs={visibleJobs} jobApplications={applications} />
        </Stack>
      </PageBody>
      <JobFormModal
        show={showForm}
        onHide={handleHideCreateForm}
        jobs={jobs}
        setJobsState={setJobsState}
      />
    </Page>
  );
}

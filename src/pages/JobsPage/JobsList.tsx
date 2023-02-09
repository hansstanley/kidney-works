import { useMemo, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  OverlayTrigger,
  Stack,
  Tooltip,
} from 'react-bootstrap';
import AppJobApplication, {
  AppJobStatus,
} from '../../types/job-application.app';
import AppJob from '../../types/job.app';
import { NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import './JobsList.css';
import useUserInfo from '../../hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';
import JobAppsFormModal from '../JobAppsPage/JobAppsFormModal';
import UseResume from '../../hooks/useResume';

export interface JobsListProps {
  jobs?: AppJob[];
  hideActions?: boolean;
  jobApplications?: AppJobApplication[];
}

export default function JobsList({
  jobs,
  hideActions,
  jobApplications: appliedStatuses,
}: JobsListProps) {
  const navigate = useNavigate();
  const hasJobs = useMemo(() => !!jobs?.length, [jobs]);
  const hasStatuses = useMemo(() => !!appliedStatuses, [appliedStatuses]);
  const [jobID, setJobID] = useState("")
  const [showAppsForm, setShowAppsForm] = useState(false);
  const {resume} = UseResume();
  const statusToText: Map<AppJobStatus, string> = new Map([
    ['open', 'Not applied'],
    ['applied', 'Applied'],
    ['reviewed', 'Reviewed'],
    ['rejected', 'Rejected'],
    ['accepted', 'Accepted'],
  ]);

  const statusToColour: Map<AppJobStatus, string | undefined> = new Map([
    ['open', undefined],
    ['applied', 'secondary'],
    ['reviewed', 'info'],
    ['rejected', 'danger'],
    ['accepted', 'success'],
  ]);

  const { user } = useAuth();
  const hasAuth = useMemo(() => !!user, [user]);
  const { isEmployer } = useUserInfo();

  function applyHandler(id: string) {
    setShowAppsForm(true);
    setJobID(id);
  }

  const applyButton = (job: AppJob) => {
    const hasApplied = appliedStatuses?.map((s) => s.jobId).includes(job.id);

    const notLoggedInMessage = (props: any) => (
      <Tooltip id="button-tooltip" {...props}>
        You have to be logged in to apply!
      </Tooltip>
    );

    if (hideActions || hasApplied) {
      return null;
    } else {
      if (hasAuth) {
        if (isEmployer) {
          return;
        }
        return <Button onClick={() => applyHandler(job.id)}>Apply</Button>;
      } else {
        return (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={notLoggedInMessage}>
            <div>
              <Button className="" disabled>
                Apply
              </Button>
            </div>
          </OverlayTrigger>
        );
      }
    }
  };

  return (
    <Stack gap={2}>
      {hasJobs ? (
        jobs?.map((j) => (
          <Card
            key={j.id}
            border={statusToColour.get(
              appliedStatuses?.find((s) => s.jobId === j.id)?.status || 'open',
            )}>
            <Card.Body>
              <Card.Title>{j.title}</Card.Title>
              <Card.Subtitle>{j.company}</Card.Subtitle>
              <Card.Text>
                Description:<br></br>
                {j.description}
              </Card.Text>
              <Card.Text>
                Requirement:<br></br>
                {j.requirements}
              </Card.Text>
              <ButtonGroup>
                <Button
                  variant="light"
                  onClick={() => navigate(`${NAV_LINKS.JOBS}/${j.id}`)}>
                  View
                </Button>
                {applyButton(j)}
              </ButtonGroup>
            </Card.Body>
            {hasStatuses && !isEmployer ? (
              <Card.Footer>
                {statusToText.get(
                  appliedStatuses?.find((s) => s.jobId === j.id)?.status ||
                    'open',
                )}
              </Card.Footer>
            ) : null}
          </Card>
        ))
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>No jobs found.</Card.Text>
          </Card.Body>
        </Card>
      )}
      <JobAppsFormModal show={showAppsForm}  job={jobID}
      onHide={() => setShowAppsForm(false)}  resume={resume} user={user}/>
    </Stack>
  );
}

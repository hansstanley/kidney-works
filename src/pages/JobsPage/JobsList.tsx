import { useMemo } from 'react';
import { Button, ButtonGroup, Card, Stack } from 'react-bootstrap';
import AppJobApplication, {
  AppJobStatus,
} from '../../types/job-application.app';
import AppJob from '../../types/job.app';
import { NAV_LINKS } from '../../utils/constants';

export interface JobsListProps {
  jobs?: AppJob[];
  hideActions?: boolean;
  appliedStatuses?: AppJobApplication[];
}

export default function JobsList({
  jobs,
  hideActions,
  appliedStatuses,
}: JobsListProps) {
  const hasJobs = useMemo(() => !!jobs?.length, [jobs]);
  const hasStatuses = useMemo(() => !!appliedStatuses, [appliedStatuses]);

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

  const applyButton = (job: AppJob) => {
    const hasApplied = appliedStatuses?.map((s) => s.jobId).includes(job.id);
    if (hideActions || hasApplied) {
      return null;
    } else {
      return <Button>Apply</Button>;
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
              <Card.Text>{j.description}</Card.Text>
              <ButtonGroup>
                <Button variant="light" href={`${NAV_LINKS.JOBS}/${j.id}`}>
                  View
                </Button>
                {applyButton(j)}
              </ButtonGroup>
            </Card.Body>
            {hasStatuses ? (
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
    </Stack>
  );
}

import { useMemo } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import AppJob from '../../types/job.app';
import { NAV_LINKS } from '../../utils/constants';

export interface JobsListProps {
  jobs?: AppJob[];
}

export default function JobsList({ jobs }: JobsListProps) {
  const hasJobs = useMemo(() => !!jobs?.length, [jobs]);

  return (
    <>
      {hasJobs ? (
        jobs?.map((j) => (
          <Card key={j.id}>
            <Card.Body>
              <Card.Title>{j.title}</Card.Title>
              <Card.Text>{j.description}</Card.Text>
              <ButtonGroup>
                <Button variant="light" href={`${NAV_LINKS.JOBS}/${j.id}`}>
                  View
                </Button>
                <Button>Apply</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>No jobs found.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

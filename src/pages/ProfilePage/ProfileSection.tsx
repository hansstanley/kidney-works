import { PropsWithChildren } from 'react';
import { Card } from 'react-bootstrap';

export default function ProfileSection({ children }: PropsWithChildren) {
  return (
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}

import { PropsWithChildren } from 'react';
import { Card } from 'react-bootstrap';

export interface ProfileSectionProps extends PropsWithChildren {
  title?: string;
}

export default function ProfileSection({
  title,
  children,
}: ProfileSectionProps) {
  return (
    <Card>
      <Card.Body>
        {title ? <Card.Title>{title}</Card.Title> : null}
        {children}
      </Card.Body>
    </Card>
  );
}

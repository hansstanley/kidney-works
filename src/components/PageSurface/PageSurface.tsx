import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

export default function PageSurface({ children }: PropsWithChildren) {
  return (
    <Container
      fluid
      className="py-5"
      style={{
        backgroundColor: 'white',
      }}>
      {children}
    </Container>
  );
}

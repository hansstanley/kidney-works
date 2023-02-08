import { PropsWithChildren } from 'react';
import { Card, Container } from 'react-bootstrap';
import PageHero from './PageHero';
import { PageHeroProps } from './PageHero/PageHero';
import PageSurface from './PageSurface';

export function Page({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export function PageHeader(props: PageHeroProps) {
  return (
    <Container>
      <Card style={{ transform: 'translateY(20px)' }}>
        <Card.Body>
          <PageHero {...props} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export function PageBody({ children }: PropsWithChildren) {
  return (
    <PageSurface>
      <Container>{children}</Container>
    </PageSurface>
  );
}

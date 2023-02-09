import { FunctionComponent, PropsWithChildren } from 'react';
import { Card, Container } from 'react-bootstrap';
import PageHero from './PageHero';
import { PageHeroProps } from './PageHero/PageHero';
import PageSurface from './PageSurface';

type PageComponent = FunctionComponent<PropsWithChildren> & {
  Header: FunctionComponent<PageHeroProps>;
  Body: FunctionComponent<PropsWithChildren>;
};

const Page: PageComponent = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

Page.Header = PageHeader;
Page.Body = PageBody;

function PageHeader(props: PageHeroProps) {
  return (
    <Container>
      <Card className="mx-5" style={{ transform: 'translateY(20px)' }}>
        <Card.Body>
          <PageHero {...props} />
        </Card.Body>
      </Card>
    </Container>
  );
}

function PageBody({ children }: PropsWithChildren) {
  // return (
  //   <PageSurface noBackground>
  //     <Container>{children}</Container>
  //   </PageSurface>
  // );
  return (
    <PageSurface noBackground noPaddingTop>
      <Container>
        <Card>
          <Card.Body>{children}</Card.Body>
        </Card>
      </Container>
    </PageSurface>
  );
  return (
    <PageSurface>
      <Container>{children}</Container>
    </PageSurface>
  );
}

export default Page;

// Kept for backwards compatibility
export { Page, PageHeader, PageBody };

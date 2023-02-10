import { animated, useScroll } from '@react-spring/web';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Card, Container, ContainerProps } from 'react-bootstrap';
import PageHero from './PageHero';
import { PageHeroProps } from './PageHero/PageHero';
import PageSurface from './PageSurface';

type PageComponent = FunctionComponent<PropsWithChildren> & {
  Header: FunctionComponent<PageHeroProps>;
  Body: FunctionComponent<PageBodyProps>;
};

const Page: PageComponent = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

Page.Header = PageHeader;
Page.Body = PageBody;

function PageHeader(props: PageHeroProps) {
  const { scrollY } = useScroll();
  return (
    <Container>
      <animated.div
        className="mx-5"
        style={{
          transform: scrollY.to((y) => `translateY(${y * 0.5 + 20}px)`),
          opacity: scrollY.to([0, 200], [1, 0]),
        }}>
        <Card>
          <Card.Body>
            <PageHero {...props} />
          </Card.Body>
        </Card>
      </animated.div>
    </Container>
  );
}

interface PageBodyProps extends PropsWithChildren, ContainerProps {
  noCard?: boolean;
}
function PageBody({ children, noCard, ...others }: PageBodyProps) {
  return (
    <PageSurface noBackground noPaddingTop>
      <Container {...others}>
        {noCard ? (
          children
        ) : (
          <Card>
            <Card.Body>{children}</Card.Body>
          </Card>
        )}
      </Container>
    </PageSurface>
  );
}

export default Page;

// Kept for backwards compatibility
export { Page, PageHeader, PageBody };

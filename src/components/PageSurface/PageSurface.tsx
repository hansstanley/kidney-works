import { PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

export interface PageSurfaceProps extends PropsWithChildren {
  noBackground?: boolean;
  noPaddingTop?: boolean;
}

export default function PageSurface({
  children,
  noBackground,
  noPaddingTop,
}: PageSurfaceProps) {
  return (
    <Container
      fluid
      className={noPaddingTop ? 'pb-5' : 'py-5'}
      style={{
        backgroundColor: noBackground ? undefined : 'white',
      }}>
      {children}
    </Container>
  );
}

import { animated, useScroll, useSpring } from '@react-spring/web';
import { PropsWithChildren } from 'react';

export default function AnimatedBackground({ children }: PropsWithChildren) {
  const { scrollYProgress } = useScroll();

  return (
    <animated.div
      style={{
        flexGrow: 1,
        background: scrollYProgress.to(
          (y) => `radial-gradient(#ffffff ${y * 100 * 0.9}%, #9fffff 100%)`,
        ),
      }}>
      {children}
    </animated.div>
  );
}

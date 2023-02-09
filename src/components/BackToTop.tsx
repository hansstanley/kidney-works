import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  window.onscroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: show ? 1 : 0 },
  });

  const handleScrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <animated.div
      onClick={handleScrollToTop}
      className="bg-primary"
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        width: 48,
        height: 48,
        borderRadius: 24,
        scale,
      }}>
      <i
        className="bi bi-arrow-up text-light position-absolute top-50 start-50 translate-middle"
        style={{ fontSize: 24 }}></i>
    </animated.div>
  );
}

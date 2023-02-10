import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import kidneys from '../images/Kidneys.png';
import { Carousel } from 'react-bootstrap';

const ImageSlider = () => {
  const length = SliderData.length;

  if (!Array.isArray(SliderData) || length <= 0) {
    return null;
  }

  const handleClick = (link: string) => () => {
    window.open(link, '_blank');
  };

  return (
    <div
      className="my-5"
      style={{
        background: `url(${kidneys}) no-repeat center/72%`,
        paddingTop: 200,
      }}>
      <section className="find-section">
        <h2 className="find mb-5">Find out more</h2>
        <Carousel
          variant="dark"
          nextIcon={<FaArrowAltCircleRight className="right-arrow" />}
          prevIcon={<FaArrowAltCircleLeft className="left-arrow" />}>
          {SliderData.map((slide, i) => (
            <Carousel.Item key={i}>
              <img
                src={slide.image}
                alt="infographic"
                className="image"
                style={{
                  width: 'auto',
                  maxHeight: '80vh',
                }}
                onClick={handleClick(slide.link)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default ImageSlider;

import React, {useState} from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const ImageSlider = () => {
  const length = SliderData.length;
  const [infographic, setInfographic] = useState(0);

  const prevSlide = () => {
    setInfographic(infographic === 0 ? length - 1 : infographic - 1)
  };

  const nextSlide = () => {
    setInfographic(infographic === length - 1 ? 0 : infographic + 1)
  };

  const handleClick = (link: string) => {
    window.open(link);
  }
  if (!Array.isArray(SliderData) || length <= 0) {
    return null;
  }

  return (
    <div>
      <h2 className='find'>Find out more</h2>
      <section className="slider">
        <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
        <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
        {SliderData.map((slide, index) => {
          return (
            <div className={index === infographic ? 'slide active' : 'slide'} key={index}>
              {index === infographic && 
                (<img src={slide.image} alt="infographic" className='image' onClick={() => handleClick(slide.link)}/>)}
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default ImageSlider
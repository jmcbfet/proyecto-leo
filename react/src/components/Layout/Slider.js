import React, { useState, useContext } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import DashboardContext from '../../context/dashboard/dashboardContext';

const Slider = (props) => {

  /* TODO: ARREGLAR EL SLIDER PA LAS IMAGENES */

  const dashboardContext = useContext(DashboardContext);
  const { galeria } = dashboardContext

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === galeria.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? galeria.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }


  
  const slides = galeria.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} style={{ width: '100%', height: '400px' }} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });
  

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      {galeria ? 
        <CarouselIndicators items={galeria} activeIndex={activeIndex} onClickHandler={goToIndex} />
      : null}

      {galeria ?

        galeria.map(item => {
          return (
            <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={item.src}
            >
              <img src={item.src} style={{ width: '100%', height: '400px' }} />
              <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
          );
        })

        : null}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Slider;
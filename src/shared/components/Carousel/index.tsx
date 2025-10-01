import React, {FC, PropsWithChildren} from 'react';
import Slider, {Settings as SliderProps} from 'react-slick';
import {styled} from '@mui/material';

import {useDragDetection} from '../../hooks';
import {isTouchDevice} from '../../utils';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface CarouselProps extends PropsWithChildren<SliderProps> {
  spaceBetweenSlide?: string;
}

const StyledSlider = styled(Slider)<CarouselProps>(
  ({spaceBetweenSlide = '20px'}) => ({
    '& .slick-list': {
      '& .slick-slide > div': {
        paddingRight: spaceBetweenSlide,
      },
    },
  }),
);

export const Carousel: FC<CarouselProps> = props => {
  const {children, ...sliderProps} = props;

  const {onMouseDown, isDragging} = useDragDetection();

  function handleChildClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <StyledSlider {...sliderProps}>
      {isTouchDevice
        ? children
        : React.Children.map(children, child => (
            <div
              onMouseDownCapture={onMouseDown}
              onClickCapture={handleChildClick}
            >
              {child}
            </div>
          ))}
    </StyledSlider>
  );
};

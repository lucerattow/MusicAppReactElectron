import React from 'react';
import { Image, Icon } from "semantic-ui-react";
import Slick from "react-slick";
import { map } from "lodash";
import { Link } from "react-router-dom";
import "./Slider.scss";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  swipeToSlide: true,
  centerMode: true
};

export function Slider({ data, basePath }) {

  return (
    <Slick {...settings} className="slider">
      {map(data, (item) => {
        return (
          <Link to={`/${basePath}/${item.id}`} key={Image.id} className='slider__item' >
            <Image src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </Link>
        );
      })}
    </Slick>
  );
}

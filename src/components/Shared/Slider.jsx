import React from 'react';
import { Image, Icon } from "semantic-ui-react";
import Slick from "react-slick";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { settings } from "./Slider.settings";
import { usePlayer } from "../../hooks";
import "./Slider.scss";

export function Slider({ data, basePath, isSong }) {
  const { playSong } = usePlayer();

  return (
    <Slick {...settings} className="slider">
      {map(data, (item) => {
        if (isSong) {
          return (
            <div key={item.id} className='slider__item' onClick={() => playSong(item, item.image)}>
              <div className='slider__item-image slider__item-play'>
                <Image src={item.image} alt={item.name} />
                <Icon name="play circle outline" />
              </div>
              <h3>{item.name}</h3>
            </div>
          );
        } else {
          return (
            <Link to={`/${basePath}/${item.id}`} key={Image.id} className='slider__item' >
              <div className='slider__item-image'>
                <Image src={item.image} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
            </Link>
          );
        }
      })}
    </Slick>
  );
}

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieCarousel = ({ lists }) => {
  const settings = {
    dots: true,
    infinite: true,
    variableWidth: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings} style={{ width: "100%" }}>
        {lists.map((s) => (
          <div key={s.id} className="movie-card">
            <div>
              <img src={`https://image.tmdb.org/t/p/w500/${s.poster_path}`} />
            </div>
            <div>
              <h4>{s.title}</h4>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx>
        {`
          .movie-card {
            width: 500px;
          }
        `}
      </style>
    </div>
  );
};

export default MovieCarousel;

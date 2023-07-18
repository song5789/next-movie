import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: 0px;
    z-index: 10;
  }
  .slick-next {
    right: 0px;
    z-index: 10;
  }
`;

export default function ElemSwiper({ simliar, isTV }) {
  const router = useRouter();
  const moveToInfo = (id, title, isTV) => {
    if (!isTV) router.push(`/movies/${title}/${id}`);
    else router.push(`/tv_series/${title}/${id}`);
  };
  const settings = {
    dots: false,
    infinite: false,
    variableWidth: true,
    speed: 650,
    slidesToShow: 1,
    slidesToScroll: 5,
  };

  return (
    <StyledSlider {...settings}>
      {simliar.map((s) => (
        <div key={s.id} className="cast-card" onClick={() => moveToInfo(s.id, s.title || s.name, isTV)}>
          <div className="card-img">
            <img src={s.poster_path ? `https://image.tmdb.org/t/p/w500/${s.poster_path}` : `https://placehold.co/500x750?text=none`} />
          </div>
          <div className="description">
            <span>
              <b>{s.title || s.name}</b>
            </span>
            <span>
              <b style={{ color: "tomato" }}>★</b>&nbsp;&nbsp;
              <span>{Math.round(s.vote_average * 10) / 10}</span>
            </span>
          </div>
        </div>
      ))}
      <style jsx>
        {`
          .cast-card {
            max-width: 180px !important;
            margin-right: 0.5rem;
            border-radius: 5px;
            box-sizing: border-box;
            overflow: hidden;
            cursor: pointer;
          }
          .cast-card img {
            max-width: 100%;
            border-radius: 5px;
          }
          .card-img {
            width: 180px;
            margin-bottom: 0.2rem;
          }
          .description {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .description > span:nth-child(2) {
            width: 100%;
            font-size: 0.75rem;
            margin: 0.25rem 0 0 0;
          }
        `}
      </style>
    </StyledSlider>
  );
}

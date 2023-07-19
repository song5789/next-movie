import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import { rule } from "postcss";
import ProfileImg from "./ProfileImg";

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

export default function CastSwiper({ cast }) {
  const router = useRouter();
  const settings = {
    dots: false,
    infinite: false,
    variableWidth: true,
    speed: 650,
    slidesToShow: 1,
    slidesToScroll: 5,
    centerPadding: "0px;",
  };

  const moveToActor = (id, name) => {
    router.push(`/actors/${name}/${id}`);
  };
  return (
    <StyledSlider {...settings}>
      {cast.map((c) => (
        <div key={c.id} className="cast-card" onClick={() => moveToActor(c.id, c.original_name)}>
          <div className="card-img">
            <ProfileImg src={c.profile_path !== null ? `https://image.tmdb.org/t/p/w500/${c.profile_path}` : `/none_500x750.svg`} />
          </div>
          <div className="description">
            <span>
              <b>{c.original_name}</b>
            </span>
            <span>
              <i>{c.character}</i>
            </span>
            <span>{c.known_for_department}</span>
          </div>
        </div>
      ))}
      <style jsx>
        {`
          .cast-card {
            max-width: 180px !important;
            margin-right: 0.25rem;
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
            margin: 0.25rem 0 0.25rem 0;
          }
          .description > span:last-child {
            font-size: 0.8rem;
            opacity: 0.8;
          }
        `}
      </style>
    </StyledSlider>
  );
}

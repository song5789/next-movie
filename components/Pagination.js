import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Pagination = ({ elem, onClick, pageNum }) => {
  const [state, setState] = useState({
    activeSlide: 1,
  });
  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    centerMode: true,
    speed: 300,
    slidesToShow: 10,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      if (next === 0) {
        onClick(next + 1);
      } else {
        onClick(next);
      }

      setState((state) => ({
        ...state,
        activeSlide: next,
      }));
    },
  };

  return (
    <Slider {...settings} style={{ width: "100%" }}>
      {elem.map((e) => (
        <div key={e} className={pageNum === e + 1 ? "countpage current" : "countpage"}>
          {e + 1}
        </div>
      ))}
      <style jsx>
        {`
          .countpage {
            width: 77px;
            margin-right: 1.5rem;
          }
          .current {
            transform: scale(1.4);
            font-weight: 600;
            color: tomato;
          }
          .slick-current {
          }
        `}
      </style>
    </Slider>
  );
};

export default Pagination;

import Image from "next/image";
import styled from "styled-components";

const Img = styled(Image)`
  height: auto !important;
  max-width: 100% !important;
  border-radius: 15px;
  box-shadow: 0px -10px 15px rgba(0, 0, 0, 0.8);
`;

const InfoPoster = ({ src }) => {
  return <Img src={src} layout="fill" alt="img" placeholder="blur" blurDataURL="https://placehold.co/500?text=none" />;
};

export default InfoPoster;

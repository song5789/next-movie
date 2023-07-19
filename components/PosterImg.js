import Image from "next/image";
import styled from "styled-components";

const Img = styled(Image)`
  max-width: 100%;
  height: auto !important;
  position: relative !important;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const PosterImg = ({ src }) => {
  return (
    <Img
      src={src}
      layout="fill"
      alt="img"
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
    />
  );
};

export default PosterImg;

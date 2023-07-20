import Image from "next/image";
import styled from "styled-components";

const Img = styled(Image)`
  max-width: 100%;
  height: auto !important;
  position: relative !important;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const BackdropImg = ({ src }) => {
  return (
    <Img
      src={src}
      layout="fill"
      alt="img"
      priority
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAE0lEQVR42mN0jvbyZEADjDQQBABqFwX7waChTgAAAABJRU5ErkJggg=="
      quality={75}
    />
  );
};

export default BackdropImg;

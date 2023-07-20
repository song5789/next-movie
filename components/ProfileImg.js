import Image from "next/image";
import styled from "styled-components";

const Img = styled(Image)`
  max-width: 100% !important;
  height: auto !important;
  position: relative !important;
`;

const ProfileImg = ({ src }) => {
  return (
    <Img
      src={src}
      layout="fill"
      alt="img"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAE0lEQVR42mN0jvbyZEADjDQQBABqFwX7waChTgAAAABJRU5ErkJggg=="
    />
  );
};

export default ProfileImg;

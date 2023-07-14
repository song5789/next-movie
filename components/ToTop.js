export default function Top() {
  const onClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="to-top" onClick={onClick}>
        <span className="text">TOP</span>
      </div>
      <style jsx>
        {`
          .to-top {
            position: fixed;
            top: 90%;
            right: 2%;
            width: 50px;
            height: 50px;
            background: #3d34eb;
            color: #fff;
            text-align: center;
            line-height: 50px;
            font-weigh: 600;
            cursor: pointer;
            border-radius: 50%;
            transition: 0.3s;
          }
          .to-top:hover {
            transform: scale(1.1);
            box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.8);
          }
          .text {
            animation: upDown 0.25s ease-in alternate-reverse infinite;
          }
          @keyframe upDown {
            0% {
              transform: translateY(0%);
            }
            100% {
              transform: translateY(-5%);
            }
          }
        `}
      </style>
    </>
  );
}

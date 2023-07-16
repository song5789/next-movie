import Image from "next/image";

export default function Not() {
  return (
    <div className="container">
      <div className="center-msg">
        <div>
          <Image
            src={`/crazy_pepe.png`}
            alt="몰?루"
            width={150}
            height={150}
            style={{
              maxWidth: "100%",
            }}
          />
        </div>
        <div>
          <h1>에러코드 404.</h1>
          <h3>찾으시는 페이지가 없습니다.</h3>
          <h3>!@#!$@$$!@...</h3>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 91.36vh;
            background: #21252e;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .center-msg {
            width: 50%;
            min-width: 500px;
            height: 350px;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0px 0px 15px rgba(255, 255, 255, 1);
          }
          .center-msg > div:first-child {
            width: 150px;
            position: absolute;
            top: 100%;
            left: 2px;
            transform: translateY(-150px);
          }
        `}
      </style>
    </div>
  );
}

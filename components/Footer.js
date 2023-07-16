import Link from "next/link";

export default function Footer() {
  const linkSt = {
    color: "inherit",
    textDecoration: "none",
  };
  return (
    <>
      <div className="container">
        <div>
          <h2 style={{ textAlign: "center" }}>영화 사이트 예제</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column", marginRight: "2rem" }}>
            <span style={{ marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255, 0.8)" }}>&copy; API Copyright</span>
            <Link href={`https://www.kobis.or.kr`} target="_blank" rel="noopener noreferer" style={linkSt}>
              www.kobis.or.kr
            </Link>
            <Link href={`https://themoviedb.org`} target="_blank" rel="noopener noreferer" style={linkSt}>
              www.themoviedb.org
            </Link>
          </div>
          <div className="next-logo">
            <img src="/next.svg" />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            padding: 1rem;
            box-sizing: border-box;
            border-top: 1px solid rgba(255, 255, 255, 0.7);
            background: #21252e;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .next-logo {
            width: 150px;
            background: #fff;
            color: #000;
            padding: 1rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </>
  );
}

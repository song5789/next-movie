import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function NavBar() {
  const router = useRouter();
  return (
    <nav className="container" style={{ flexDirection: "column" }}>
      <Image src={"/next.svg"} width={100} height={100} alt="logo" style={{ marginBottom: "0.5rem" }} />
      <div className="link">
        <Link legacyBehavior href={"/"}>
          <a className={router.pathname === "/" ? "active" : ""}>Movies</a>
        </Link>
        <Link legacyBehavior href={"/ko-movie-rnk"}>
          <a className={router.pathname === "/ko-movie-rnk" ? "active" : ""}>BoxOffice(KOR)</a>
        </Link>
        <Link legacyBehavior href={"/about"}>
          <a className={router.pathname === "/about" ? "active" : ""}>About</a>
        </Link>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 5rem;
            box-shadow: 0px 2px 12px rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            padding: 1rem;
            box-sizing: border-box;
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 999;
          }
          .container a {
            text-decoration: none;
            font-weight: 600;
            font-size: 20px;
            color: black;
            margin-right: 1rem;
          }
          .active {
            color: tomato !important;
          }
        `}
      </style>
    </nav>
  );
}

export default React.memo(NavBar);

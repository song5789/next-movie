import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

function NavBar() {
  const router = useRouter();
  const [state, setState] = useState({
    type: "movie",
    title: null,
  });

  const onChange = useCallback(
    (e) => {
      setState((state) => ({
        ...state,
        title: e.target.value,
      }));
    },
    [state.title]
  );
  const onSelect = useCallback(
    (e) => {
      setState((state) => ({
        ...state,
        type: e.target.value,
      }));
    },
    [state.type]
  );
  const onSearch = useCallback(
    (type, title) => {
      router.push(`/search/${type}/${title}`);
      setState((state) => ({
        ...state,
        title: "",
      }));
    },
    [router, state]
  );

  const onKeyDown = useCallback(
    (e, type, title) => {
      const { keyCode } = e;
      if (keyCode === 13) {
        router.push(`/search/${type}/${title}`);
        setState((state) => ({
          ...state,
          title: "",
        }));
      }
    },
    [router, state]
  );

  return (
    <nav className="container center">
      <div className="link-con center" style={{ flexDirection: "column" }}>
        <Image src={"/next.svg"} width={100} height={20} alt="logo" style={{ marginBottom: "0.5rem" }} />
        <div className="link">
          <Link legacyBehavior href={"/"}>
            <a className={router.pathname === "/" ? "active" : ""}>Movies</a>
          </Link>
          <Link legacyBehavior href={"/tv_list"}>
            <a className={router.pathname === "/tv_list" ? "active" : ""}>TV Show</a>
          </Link>
          <Link legacyBehavior href={"/about"}>
            <a className={router.pathname === "/about" ? "active" : ""}>About</a>
          </Link>
        </div>
      </div>
      <div className="search">
        <select onChange={onSelect}>
          <option value={`movie`}>영화</option>
          <option value={`tv`}>TV</option>
        </select>
        <input onChange={onChange} onKeyDown={(e) => onKeyDown(e, state.type, state.title)} value={state.title || ""} type="text" className="search-txt" placeholder="제목 검색" />
        <input onClick={() => onSearch(state.type, state.title)} type="button" value={`검색`} />
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 5rem;
            box-shadow: 0px 2px 12px rgba(255, 255, 255, 0.8);
            display: flex;
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
          .link-con {
            display: flex;
            flex-direction: column;
          }
          .active {
            color: tomato !important;
          }
          .search {
            width: 25%;
            height: 3rem;
            position: absolute;
            right: 2%;
            padding: 0.5rem;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            min-width: 500px;
          }
          .search input[type="text"] {
            width: 44%;
            height: 100%;
            border-radius: 10px;
            margin: 0 0.25rem;
            padding 0.5rem;
            box-sizing: border-box;
            outline:none;
          }
          .search input[type="button"]{
            width: 15%;
            height: 100%;
            border-radius: 10px;
            border: none;
            background: #21252e;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            cursor:pointer;
          } 
          .search input[type="button"]:hover{
            opacity: 0.8;
          }
          .search select{
            height: 100%;
            width: 15%;
            text-align: center;
          }
          .center {
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </nav>
  );
}

export default React.memo(NavBar);

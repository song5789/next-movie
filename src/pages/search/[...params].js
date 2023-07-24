import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import useSetPage from "../../../hook/useSetPage";
import SEO from "../../../components/SEO";
import { useRouter } from "next/router";
import PosterImg from "../../../components/PosterImg";

const getSearchResult = async (type, title, page = 1) => {
  const result = await (await fetch(`https://next-movie-ten.vercel.app//search/db/${type}/${title}/${page}`)).json();
  return result;
};

export default function SearchPage({ params }) {
  const [searchState, setSearchState] = useState({
    lists: [],
    loading: false,
    total: null,
    current: 1,
  });

  const [type, title] = params;
  const router = useRouter();

  useEffect(() => {
    setSearchState((state) => ({ ...state, loading: true }));
    getSearchResult(type, title, searchState.current).then((data) => {
      setSearchState((state) => ({
        ...state,
        lists: data.results,
        total: data.total_pages,
        loading: false,
      }));
    });
  }, [searchState.current, title, type]);

  const onPush = (type, id, title) => {
    if (type === "movie") return router.push(`/movies/${title}/${id}`);
    else if (type === "tv") return router.push(`/tv_series/${title}/${id}`);
  };

  const onClick = (current) => {
    setSearchState((state) => ({
      ...state,
      current,
    }));
  };

  const { loading, lists, total, current } = searchState;
  const paginations = useSetPage(total);

  const falieSt = {
    width: "30%",
    height: 80,
    fontSize: "2rem",
    padding: `1rem`,
    boxSizing: "border-box",
    margin: "3rem auto",
    background: "#fff",
    borderRadius: "15px",
    textAlign: "center",
  };

  if (loading) return <div>Loading...</div>;
  if (Array.isArray(lists) && lists.length === 0)
    return (
      <>
        <SEO title={`${title} 검색결과`} />
        <div style={falieSt}>{`${title}`} 의 검색결과가 없습니다</div>
      </>
    );
  return (
    <div>
      <SEO title={`${title} 검색결과`} />
      <div className="container">
        <div>
          <h1>{`'${title}' 검색 결과`}</h1>
          <h3>현재 페이지 : {`${current}`}</h3>
        </div>
        <div className="page-con">
          <div className="pagination">
            {paginations.map((v) => (
              <div className="page-number" key={v} onClick={() => onClick(v + 1)}>
                {v + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="movie-cards">
          {lists.map((s) => (
            <div key={s.id} onClick={() => onPush(type, s.id, type === `movie` ? s.title : s.name)}>
              <div>
                <PosterImg src={s.poster_path ? `https://image.tmdb.org/t/p/w500/${s.poster_path}` : "/none_500x750.svg"} />
              </div>

              <div>
                <h2>{type === "movie" ? s.title : s.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>
        {`
          .container {
            max-width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #21252e;
            color: #fff;
            padding: 2rem;
          }
          .container > div:first-child {
            width: 400px;
            background: #fff;
            margin-bottom: 1rem;
            color: black;
            text-align: center;
            border-radius: 18px;
            box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.8);
          }
          .page-con {
            width: 90vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #21252e;
            position: sticky;
            top: 5rem;
            z-index: 998;
            padding: 1rem 0 1rem 0;
            box-sizing: border-box;
          }
          .pagination {
            width: 600px;
            display: flex;
            flex-direction: row;
            font-size: 1.2rem;
            overflow: scroll;
            justify-content: center;
            align-items: center;
          }

          .pagination::-webkit-scrollbar {
            display: none;
          }

          .page-number {
            margin-right: 0.5rem;
            width: 25px;
            background: #fff;
            color: #000;
            border-radius: 50px;
            text-align: center;
            cursor: pointer;
          }
          .movie-cards {
            width: 95%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          .movie-cards > div {
            width: 450px;
            margin: 0 0.5rem 0.5rem 0;
            cursor: pointer;
            background: #0c1421;
            border-radius: 15px;
            transition: 0.25s;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .poster {
            max-width: 100%;
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
          }
          .movie-cards > div:hover {
            transform: scale(1.02);
            box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.8);
            z-index: 997;
          }
          .movie-cards h2 {
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}

import { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import useSetPage from "../../hook/useSetPage";
import Pagination from "../../components/Pagination";
import Link from "next/link";
import { useRouter } from "next/router";

const getMovieList = async (page) => {
  const { results, total_pages, total_results } = await (await fetch(`http://localhost:3000/get/tmdbNowPlaying/${page}`)).json();
  return { results, total_pages, total_results };
};

export default function Home() {
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState({
    totalPage: null,
    totalResult: null,
    pageNum: 1,
  });
  const router = useRouter();

  useEffect(() => {
    getMovieList(page.pageNum).then(({ results, total_pages, total_results }) => {
      setLists(results);
      setPage((state) => ({
        ...state,
        totalPage: total_pages,
        totalResult: total_results,
      }));
    });
  }, [page.pageNum]);

  const { totalPage, totalResult, pageNum } = page;

  const setPages = useSetPage(totalPage);
  const onClick = (pageNum) => {
    setPage((state) => ({
      ...state,
      pageNum,
    }));
  };
  const onPush = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div>
      <SEO title="Home" />
      <div className="container">
        <div>
          <h1>상영중인 영화</h1>
        </div>
        <div className="pagination">
          <Pagination elem={setPages} onClick={onClick} pageNum={pageNum} />
        </div>
        <div className="movie-cards">
          {lists.map((s) => (
            <div key={s.id} onClick={() => onPush(s.id, s.title)}>
              <div>
                <img src={`https://image.tmdb.org/t/p/original/${s.poster_path}`} />
              </div>
              <div>
                <h2>{s.title}</h2>
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
          .pagination {
            width: 600px;
            margin-bottom: 1rem;
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
          .movie-cards > div img {
            max-width: 100%;
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
          }
          .movie-cards > div:hover {
            transform: scale(1.08);
            box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.8);
          }
          .movie-cards h2 {
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}

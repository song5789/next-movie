import { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import useSetPage from "../../hook/useSetPage";
import Pagination from "../../components/Pagination";
import Link from "next/link";
import { useRouter } from "next/router";
import PosterImg from "../../components/PosterImg";

const getTvShowList = async (page) => {
  const { results, total_pages, total_results } = await (await fetch(`https://next-movie-ten.vercel.app/get/tmdb/pop_tv_list/${page}`)).json();
  return { results, total_pages, total_results };
};

export default function TVlist() {
  const [lists, setLists] = useState([]);
  const [page, setPage] = useState({
    totalPage: null,
    totalResult: null,
    pageNum: 1,
  });
  const router = useRouter();

  useEffect(() => {
    getTvShowList(page.pageNum).then(({ results, total_pages, total_results }) => {
      setLists(results);
      setPage((state) => ({
        ...state,
        totalPage: total_pages,
        totalResult: total_results,
      }));
    });
  }, [page.pageNum]);

  let { totalPage, pageNum } = page;
  if (totalPage >= 100) {
    totalPage = 100;
  }
  const setPages = useSetPage(totalPage);
  const onClick = (pageNum) => {
    setPage((state) => ({
      ...state,
      pageNum,
    }));
  };
  const onPush = (id, title) => {
    router.push(`/tv_series/${title}/${id}`);
  };
  return (
    <div>
      <SEO title="Movies" />
      <div className="container">
        <div>
          <h1>On Air</h1>
        </div>
        <div className="page-con">
          <div className="pagination">
            <Pagination elem={setPages} onClick={onClick} pageNum={pageNum} />
          </div>
        </div>
        <div className="movie-cards">
          {lists.map((s) => (
            <div key={s.id} onClick={() => onPush(s.id, s.name)}>
              <Link href={`/tv_series/${s.name}/${s.id}`}>
                <div>
                  <PosterImg src={s.poster_path ? `https://image.tmdb.org/t/p/w500/${s.poster_path}` : "/none_500x750.svg"} />
                </div>
              </Link>
              <div>
                <h2>{s.name}</h2>
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

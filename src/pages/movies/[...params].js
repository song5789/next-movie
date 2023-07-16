import { useRouter } from "next/router";
import SEO from "../../../components/SEO";
import { useEffect, useState } from "react";

const getMovieInfo = async (id) => {
  const result = await (await fetch(`http://localhost:3000/get/tmdb/movies/${id}`)).json();
  return result;
};
const getMovieCredits = async (id) => {
  const result = await (await fetch(`http://localhost:3000/get/tmdb/movies/credits/${id}`)).json();
  return result;
};

export default function MovieDetail({ params, movie, credits }) {
  const [isClient, setIsClient] = useState(false);
  const [mainCrew, setMainCrew] = useState({
    producer: null,
    director: null,
  });
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
    setMainCrew((state) => ({
      ...state,
      director: credits.crew.filter((v) => v.job === "Director"),
      producer: credits.crew.filter((v) => v.job === "Producer"),
    }));
  }, []);

  const [title, id] = params;
  const { producer, director } = mainCrew;
  if (isClient) {
    return (
      <>
        <div className="container">
          <SEO title={title} />
          <div className="movie-i-con">
            <div className="backdrop">
              <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
              <div className="detail-info">
                <div className="poster">
                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
                </div>
                <div className="basic-info">
                  <div className="basic-info-title">
                    <span>{movie.title}</span>
                  </div>
                  <div>
                    <h4 style={{ margin: "0" }}>{movie.original_title}</h4>
                  </div>
                  <div className="basic-info-gibon">
                    <table>
                      <tr>
                        <td className="t-h">
                          <h3>개봉</h3>
                        </td>
                        <td className="t-d">
                          <h3>{movie.release_date}</h3>
                        </td>
                      </tr>
                      <tr>
                        <td className="t-h">
                          <h3>국가</h3>
                        </td>
                        <td className="t-d">
                          <h3>{movie.original_language}</h3>
                        </td>
                      </tr>
                      <tr>
                        <td className="t-h">
                          <h3>장르</h3>
                        </td>
                        <td className="t-d">
                          <h3>
                            {movie.genres.map((ge) => (
                              <span key={ge.id}>{ge.name}&nbsp;&nbsp;&nbsp;</span>
                            ))}
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <td className="t-h">
                          <h3>평점</h3>
                        </td>
                        <td className="t-d">
                          <h3>
                            <b style={{ color: "tomato" }}>★</b>&nbsp;&nbsp;
                            {Math.round(movie.vote_average * 10) / 10}&nbsp;&nbsp;
                            <i style={{ color: "rgba(0,0,0,0.8)", fontSize: 12 }}>({movie.vote_count} 명 참여)</i>
                          </h3>
                        </td>
                      </tr>
                      <tr>
                        <td className="t-h">
                          <h3>러닝타임</h3>
                        </td>
                        <td className="t-d">
                          <h3>{movie.runtime} 분</h3>
                        </td>
                      </tr>
                      <tr>
                        <td className="t-h">
                          <h3>감독</h3>
                        </td>
                        <td className="t-d">
                          <h3>{director[0].name || ""}</h3>
                        </td>
                      </tr>
                      <tr>
                        <td className="t-h">
                          <h3>제작</h3>
                        </td>
                        <td className="t-d">
                          {producer.map((p) => (
                            <b key={p.id}>{p.name},&nbsp;&nbsp;</b>
                          ))}{" "}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .container {
              width: 100%;
              background: #21252e;
              color: #fff;
              padding: 0.5rem 0 0 0;
            }
            .movie-i-con {
              min-width: 800px;
              max-width: 1400px;
              margin: 0 auto;
            }
            .backdrop {
              width: 100%;
              position: relative;
            }
            .backdrop > img {
              max-width: 100%;
              border-top-right-radius: 15px;
              border-top-left-radius: 15px;
            }
            .detail-info {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              width: 100%;
              background: #fff;
              color: black;
              position: relative;
              top: -300px;
              border-bottom-right-radius: 15px;
              border-bottom-left-radius: 15px;
              padding: 1rem;
              box-sizing: border-box;
              box-shadow: 0px -30px 30px rgba(0, 0, 0, 0.8);
            }
            .poster {
              width: 30%;
              position: relative;
              top: -110px;
              left: 25px;
            }
            .poster img {
              max-width: 100%;
              border-radius: 15px;
              box-shadow: 0px -10px 15px rgba(0, 0, 0, 0.8);
            }
            .basic-info {
              width: 65%;
            }
            .basic-info-title {
              width: 100%;
              height: 5rem;
              line-height: 5rem;
              font-size: 1.9rem;
              font-weight: 700;
              margin-bottom: 0.5rem;
              border-bottom: 1px solid rgba(0, 0, 0, 0.8);
            }
            .basic-info-gibon {
              margin-top: 1rem;
              width: 100%;
              padding-left: 1rem;
            }
            table {
              width: 100%;
              border-left: 5px solid rgba(25, 51, 112, 1);
              border-collapse: collapse;
            }
            table h3 {
              margin: 0;
            }
            .t-h {
              width: 15%;
              padding: 1rem;
              height: 10px;
            }
          `}
        </style>
      </>
    );
  }
}

export async function getServerSideProps({ params: { params } }) {
  const movie = await getMovieInfo(params[1]);
  const credits = await getMovieCredits(params[1]);
  return {
    props: {
      params,
      movie,
      credits,
    },
  };
}

import { useRouter } from "next/router";
import SEO from "../../../components/SEO";
import { useEffect, useState } from "react";
import CastSwiper from "../../../components/CastSwiper";
import SimilarSwiper from "../../../components/SimilarSwiper";
import BackdropImg from "../../../components/BackdropImg";
import InfoPoster from "../../../components/InfoPoster";
import Image from "next/image";

const getMovieInfo = async (id) => {
  const result = await (await fetch(`https://next-movie-ten.vercel.app/get/tmdb/movies/${id}`)).json();
  return result;
};
const getMovieCredits = async (id) => {
  const result = await (await fetch(`https://next-movie-ten.vercel.app/get/tmdb/movies/credits/${id}`)).json();
  return result;
};
async function getSimilarMovies(id) {
  const result = await (await fetch(`https://next-movie-ten.vercel.app/get/tmdb/movies/similar/${id}`)).json();
  return result;
}

async function getRecommendations(id) {
  const result = await (await fetch(`https://next-movie-ten.vercel.app/get/tmdb/movies/recommendations/${id}`)).json();
  return result;
}

export default function MovieDetail({ params, movie, credits, similar, recommendations }) {
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
    console.log(producer);
    console.log(director);
  }, [credits]);

  const [title, id] = params;
  const { producer, director } = mainCrew;
  console.log(producer);
  console.log(director);
  if (isClient) {
    return (
      <>
        <div className="container">
          <SEO title={title} />
          <div className="movie-i-con">
            <div className="backdrop">
              <BackdropImg src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : `/none_3160x2160.svg`} />
              <div className="detail-info">
                <div className="poster">
                  <InfoPoster src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `/none_500x750.svg`} />
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
                            <i style={{ color: "rgba(0,0,0,0.8)", fontSize: 12 }}>({Number(movie.vote_count).toLocaleString()} 명 참여)</i>
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
            <div className="overview">
              <h2>소개</h2>
              <p>{movie.overview || "개요 없음."}</p>
            </div>
            <div className="casts">
              <h1>출연</h1>
              <CastSwiper cast={credits.cast} />
            </div>
            <div className="recommendations">
              <h1>추천 영화</h1>
              <SimilarSwiper simliar={recommendations.results} />
            </div>
            <div className="similar">
              <h1>유사한 영화</h1>
              <SimilarSwiper simliar={similar.results} />
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
              margin-bottom: -270px;
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
            .overview {
              margin-bottom: 1.7rem;
              padding: 1.5rem;
              border-radius: 15px;
              background: #fff;
              color: #000;
              font-size: 20px;
            }
            .casts {
              width: 100%;
              background: #fff;
              border-radius: 15px;
              padding: 1.5rem;
              box-sizing: border-box;
              color: #000;
              margin-bottom: 1.7rem;
            }
            .similar {
              margin-bottom: 1.7rem;
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
  const similar = await getSimilarMovies(params[1]);
  const recommendations = await getRecommendations(params[1]);
  return {
    props: {
      params,
      movie,
      credits,
      similar,
      recommendations,
    },
  };
}

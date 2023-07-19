import { useEffect, useState } from "react";
import SEO from "../../../components/SEO";
import TVSwiper from "../../../components/TVSwiper";
import CastSwiper from "../../../components/CastSwiper";
import ElemSwiper from "../../../components/SimilarSwiper";
import BackdropImg from "../../../components/BackdropImg";
import InfoPoster from "../../../components/InfoPoster";

const getTVShowInfo = async (id) => {
  const result = await (await fetch(`http://localhost:3000/get/tmdb/tv_show/${id}`)).json();
  return result;
};

export default function TVDetail({ params, tv }) {
  const [isClient, setIsClient] = useState(false);
  const [title, id] = params;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    return (
      <>
        <div className="tv-i-con">
          <SEO title={title} />
          <div className="backdrop">
            <BackdropImg src={tv.backdrop_path ? `https://image.tmdb.org/t/p/original/${tv.backdrop_path}` : `/none_3160x2160.svg`} />
            <div className="detail-info">
              <div className="main-poster">
                <InfoPoster src={tv.poster_path ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : `/none_500x750.svg`} />
              </div>
              <div className="basic-info">
                <div className="main-title">
                  <span>{title}</span>
                </div>
                <div>
                  <h4 style={{ margin: "0" }}>{tv.original_name}</h4>
                </div>
                <div className="info-table">
                  <table>
                    <tr>
                      <td className="t-h">
                        <h3>첫 방영</h3>
                      </td>
                      <td>
                        <h3>{tv.first_air_date}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="t-h">
                        <h3>최근 방영</h3>
                      </td>
                      <td>
                        <h3>
                          시즌 {tv.last_episode_to_air.season_number}, {tv.last_episode_to_air.episode_number} 화 ({tv.last_episode_to_air.air_date})
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="t-h">
                        <h3>장르</h3>
                      </td>
                      <td>
                        <h3>
                          {tv.genres.map((v) => (
                            <span key={v.id}>{v.name}&nbsp;&nbsp;&nbsp;</span>
                          ))}
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="t-h">
                        <h3>평점</h3>
                      </td>
                      <td>
                        <h3>
                          <b style={{ color: "tomato" }}>★</b>&nbsp;&nbsp;
                          {Math.round(tv.vote_average * 10) / 10}&nbsp;&nbsp;
                          <i style={{ color: "rgba(0,0,0,0.8)", fontSize: 12 }}>({Number(tv.vote_count).toLocaleString()} 명 참여)</i>
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="t-h">
                        <h3>회차별 러닝타임</h3>
                      </td>
                      <td>
                        <h3>
                          {tv.episode_run_time.map((v, index) => (
                            <span key={index}>{v} 분&nbsp;</span>
                          ))}
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="t-h">
                        <h3>제작</h3>
                      </td>
                      <td>
                        <h3>
                          {tv.created_by.map((v) => (
                            <span key={v.id}>{v.name},&nbsp;&nbsp;</span>
                          ))}
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="t-h">
                        <h3>총 시즌</h3>
                      </td>
                      <td>
                        <h3>{tv.number_of_seasons} 개</h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="t-h">
                        <h3>총 에피소드</h3>
                      </td>
                      <td>
                        <h3>{Number(tv.number_of_episodes).toLocaleString()} 개</h3>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="cast">
            <h1>소개</h1>
            <h3>{tv.overview || "개요 없음"}</h3>
          </div>
          <div className="cast margin-top-basic">
            <h1>주요 출연진</h1>
            <CastSwiper cast={tv.credits.cast} />
          </div>
          <div className="cast margin-top-basic ">
            <h1>방송사</h1>
            <div className="flex">
              {tv.networks.map((n) => (
                <div key={n.id} className="networks ">
                  <img src={`https://image.tmdb.org/t/p/w500/${n.logo_path}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="color-w">
            <h1>시즌 둘러보기</h1>
            <TVSwiper episode={tv.seasons} seriesNum={tv.id} seriesName={tv.name} />
          </div>
          <div className="last color-w">
            <h1>추천 드라마</h1>
            <ElemSwiper simliar={tv.recommendations.results} isTV />
          </div>
        </div>
        <style jsx>
          {`
            .tv-i-con {
              min-width: 800px;
              max-width: 1400px;
              margin: 0.5rem auto 0 auto;
            }
            .color-w {
              color: #fff;
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
            .main-poster {
              width: 30%;
              position: relative;
              top: -110px;
              left: 25px;
            }
            .main-poster img {
              max-width: 100%;
              border-radius: 15px;
              box-shadow: 0px -10px 15px rgba(0, 0, 0, 0.8);
            }
            .basic-info {
              width: 65%;
            }
            .main-title {
              width: 100%;
              height: 5rem;
              line-height: 5rem;
              font-size: 1.9rem;
              font-weight: 700;
              margin-bottom: 0.5rem;
              border-bottom: 1px solid rgba(0, 0, 0, 0.8);
            }
            .margin-top-basic {
              margin-top: 1.7rem;
            }
            .info-table {
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
              width: 20%;
              padding: 1rem;
              height: 10px;
            }
            .cast {
              background: #fff;
              padding: 1.5rem;
              border-radius: 15px;
            }
            .last {
              margin-bottom: 1.7rem;
            }
            .networks {
              max-width: 150px;
              margin-right: 3rem;
            }
            .networks > img {
              max-width: 100%;
            }
            .flex {
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
            }
          `}
        </style>
      </>
    );
  }
}

export async function getServerSideProps({ params: { params } }) {
  const result = await getTVShowInfo(params[1]);
  return {
    props: {
      tv: result,
      params,
    },
  };
}

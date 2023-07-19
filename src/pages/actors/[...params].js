import { useEffect, useState } from "react";
import SEO from "../../../components/SEO";
import ageFunc from "../../../hook/ageFunc";
import SimilarSwiper from "../../../components/SimilarSwiper";

const getAtorsInfo = async (id) => {
  const result = await (await fetch(`http://localhost:3000/get/tmdb/actors/${id}`)).json();
  return result;
};

export default function ActorPage({ params, actors, movie_credits, tv_credits }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [name, id] = params;
  if (isClient) {
    return (
      <>
        <div className="container">
          <SEO title={name} />
          <div className="actor-info">
            <div className="actor-img">
              <img src={`https://image.tmdb.org/t/p/w500/${actors.profile_path}`} />
            </div>
            <div className="detail-info">
              <div>
                <h1>{name}</h1>
              </div>
              <div>
                <table>
                  <tr>
                    <td className="t-h">
                      <h3>출생</h3>
                    </td>
                    <td className="t-d">
                      <h3>
                        {actors.birthday} ({ageFunc(actors.birthday)} 세)
                      </h3>
                    </td>
                  </tr>
                  {actors.deathday && (
                    <tr>
                      <td className="t-h">
                        <h3>사망</h3>
                      </td>
                      <td className="t-d">
                        <h3>{actors.deathday}</h3>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="t-h">
                      <h3>출생지</h3>
                    </td>
                    <td className="t-d">
                      <h3>{actors.place_of_birth}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td className="t-h">
                      <h3>성별</h3>
                    </td>
                    <td className="t-d">
                      <h3>{actors.gender == 1 ? "여성" : "남성"}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td className="t-h">
                      <h3>출연 작품 수</h3>
                    </td>
                    <td className="t-d">
                      <h3>{movie_credits.cast.length + tv_credits.cast.length} 편</h3>
                    </td>
                  </tr>
                  <tr>
                    <td className="t-h">
                      <h3>유명 분야</h3>
                    </td>
                    <td className="t-d">
                      <h3>{actors.known_for_department}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td className="t-h">
                      <h3>다른 명칭</h3>
                    </td>
                    <td className="t-d row">
                      {actors.also_known_as.map((v, index) => (
                        <b key={index}>{v},&nbsp;&nbsp;</b>
                      ))}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="biography">
            <h2>약력</h2>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", overflow: "auto" }}>{actors.biography}</pre>
          </div>
        </div>
        <div className="credits">
          <h1>출연작 (영화)</h1>
          <SimilarSwiper simliar={movie_credits.cast} />
        </div>
        <div className="credits">
          <h1>출연작 (TV 시리즈)</h1>
          <SimilarSwiper simliar={tv_credits.cast} isTV />
        </div>
        <style jsx>
          {`
            .container {
              min-width: 800px;
              max-width: 1400px;
              margin: 2rem auto;
              padding: 2rem;
              box-sizing: border-box;
              background: #fff;
              border-radius: 15px;
            }
            .actor-info {
              width: 100%;
              display: flex;
              flex-direction: row;
            }
            .actor-img {
              margin-right: 1.5rem;
              width: 32%;
            }
            .actor-img img {
              max-width: 100% !important;
              border-radius: 15px;
            }
            .detail-info {
              width: 68%;
            }
            .detail-info > div:first-child {
              width: 100%;
              border-bottom: 1px solid black;
              margin-bottom: 1rem;
            }
            .detail-info > div:nth-child(2) {
              width: 100%;
              padding-left: 1rem;
            }
            table {
              width: 100%;
              border-left: 7px solid rgba(25, 51, 112, 1);
              border-collapse: collapse;
            }
            .t-h {
              width: 15%;
              padding: 1rem;
              height: 10px;
            }
            .biography {
              width: 100%;
              padding: 1.5rem;
              box-sizing: border-box;
            }
            .credits {
              min-width: 800px;
              max-width: 1400px;
              margin: 0 auto;
              padding: 0rem;
              box-sizing: border-box;
              color: #fff;
            }
            pre {
              font-size: 15px;
            }
          `}
        </style>
      </>
    );
  }
}

export async function getServerSideProps({ params: { params } }) {
  const actors = await getAtorsInfo(params[1]);
  const { movie_credits, tv_credits } = actors;
  return {
    props: {
      actors,
      params,
      movie_credits,
      tv_credits,
    },
  };
}

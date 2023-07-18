import { useRouter } from "next/router";
import SEO from "../../../components/SEO";

async function getSeasonInfo(seriesid, seasonid) {
  const result = await (await fetch(`http://localhost:3000/get/tmdb/tv_show/${seriesid}/seasons/${seasonid}`)).json();
  return result;
}

export default function Seasons({ params, season }) {
  const router = useRouter();

  const moveEpInfo = (seriesName, seriesId, seasonName, seasonId, episodeId) => {
    router.push(`/episodes/${seriesName}/${seriesId}/${seasonName}/${seasonId}/${episodeId}`);
  };

  const [seriesName, seriesId, seasonName, seasonId] = params;
  return (
    <>
      <div className="container">
        <SEO title={`${seriesName} : ${seasonName}`} />
        <div className="season-info">
          <div className="season-poster">
            <img src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} />
          </div>
          <div className="season-episode">
            <div className="season-title">
              <span>
                {seriesName} : {seasonName}
              </span>
            </div>
            <div>
              <h3>
                <b>방영일 : {season.air_date}, </b>
                <b>전체 {season.episodes.length} 화</b>
              </h3>
            </div>
            <div>
              {season.episodes.map((e) => (
                <div className="episodes-card" onClick={() => moveEpInfo(seriesName, seriesId, seasonName, seasonId, e.episode_number)}>
                  <div className="episodes-still">
                    <img src={e.still_path ? `https://image.tmdb.org/t/p/w500/${e.still_path}` : `https://placehold.co/500x750?text=none`} />
                  </div>
                  <div className="episode-info">
                    <div>{e.name}</div>
                    <div>
                      <i>
                        시즌 {e.season_number} : {e.episode_number}화
                      </i>
                    </div>
                    <div>{e.overview}</div>
                    <div>{e.runtime} 분</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            min-width: 800px;
            max-width: 1400px;
            margin: 0.5rem auto;
            background: #fff;
            border-radius: 15px;
          }
          .season-info {
            width: 100%;
            display: flex;
            flex-direcion: row;
            padding: 1.5rem;
            box-sizing: border-box;
          }
          .season-poster {
            width: 30%;
            border-radius: 15px;
            box-shadow: 0 0 15px rgb(0, 0, 0);
            margin-right: 1.5rem;
          }
          .season-poster > img {
            max-width: 100%;
            border-radius: 15px;
          }
          .season-episode {
            width: 100%;
          }
          .season-title {
            width: 100%;
            font-size: 1.7rem;
            font-weight: 700;
            border-bottom: 1px solid black;
            margin-bottom: 1rem;
          }
          .season-episode > div:last-child {
            width: 100%;
            height: 22rem;
            overflow: auto;
            background: #21252e;
            border-radius: 4px;
            color: #fff;
            padding: 1rem;
            box-sizing: border-box;
          }
          .season-episode > div:last-child::-webkit-scrollbar {
            display: none;
          }
          .season-episode > div:last-child > div:not(:last-child) {
            border-bottom: 1px solid #fff;
          }
          .episodes-card {
            width: 100%;
            padding: 0.35rem;
            box-sizing: border-box;
            cursor: pointer;
            transition: 0.2s;
          }
          .episodes-card:hover {
            background: #fff;
            color: #000;
          }
          .episodes-still {
            width: 20%;
            margin-right: 1rem;
          }
          .episodes-still > img {
            max-width: 100%;
          }
          .episode-info > div:first-child {
            font-size: 1.2rem;
            font-weight: 600;
          }
          .episode-info > div {
            margin-bottom: 0.25rem;
          }
        `}
      </style>
    </>
  );
}

export async function getServerSideProps({ params: { params } }) {
  const season = await getSeasonInfo(params[1], params[3]);
  return {
    props: {
      params,
      season,
    },
  };
}

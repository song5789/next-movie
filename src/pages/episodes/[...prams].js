import { useRouter } from "next/router";
import SEO from "../../../components/SEO";
import CastSwiper from "../../../components/CastSwiper";

const getEpisodeInfo = async (seriesId, seasonId, episodeId) => {
  const result = await (await fetch(`http://localhost:3000/get/tmdb/tv_show/${seriesId}/seasons/${seasonId}/episodes/${episodeId}`)).json();
  return result;
};

export default function Episode({ prams, episode }) {
  const router = useRouter();
  const [seriesName, seriesId, seasonName, seasonId, episodeId] = prams;
  return (
    <>
      <div className="container">
        <SEO title={`${seriesName} : ${seasonName} ${episodeId}화`} />
        <div className="backdrop">
          <img src={episode.still_path ? `https://image.tmdb.org/t/p/original/${episode.still_path}` : `https://placehold.co/3840x2160?text=none`} />
          <div className="episode-name">{episode.name}</div>
          <div className="episode-info">
            <div>
              <h1>개요</h1>
              <h2>{episode.overview}</h2>
            </div>
            <div className="etc">
              <div>
                <h3>{episode.air_date}</h3>
                <h3>{episode.runtime} 분</h3>
              </div>
            </div>
            <div className="crew">
              <h2>제작진</h2>
              <CastSwiper cast={episode.crew} />
            </div>
            <div className="guest">
              <h2>특별출연</h2>
              <CastSwiper cast={episode.guest_stars} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            max-width: 1400px;
            min-width: 800px;
            margin: 0.5rem auto 1.7rem auto;
            background: #fff;
            border-radius: 15px;
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
          .episode-info {
            width: 100%;
            position: relative;
            padding: 2rem;
            box-sizing: border-box;
            background: #fff;
            margin-top: -300px;
            box-shadow: 0 -40px 60px rgba(0, 0, 0, 0.8);
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
          }
          .episode-name {
            background: transparent !important;
            color: #fff;
            width: 100%;
            font-size: 3rem;
            font-weight: 700;
            position: absolute;
            top: 20%;
            left: 2rem;
          }
          .crew {
            margin-top: 2rem;
          }
          .guest {
            margin-top: 2rem;
          }
          .etc {
            width: 100%;
          }
          .etc h3 {
            margin: 0;
            text-align: right;
          }
        `}
      </style>
    </>
  );
}

export async function getServerSideProps({ params: { prams } }) {
  const [seriesName, seriesId, seasonName, seasonId, episodeId] = prams;
  const episode = await getEpisodeInfo(seriesId, seasonId, episodeId);
  return {
    props: {
      episode,
      prams,
    },
  };
}

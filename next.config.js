/** @type {import('next').NextConfig} */

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/get/todayRk/:date",
        destination: `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=:date&itemPerPage=5`,
      },
      {
        source: "/get/tmdbNowPlaying",
        destination: `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=ko-US`,
      },
    ];
  },
};

module.exports = nextConfig;

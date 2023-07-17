/** @type {import('next').NextConfig} */

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/get/todayRk/:date",
        destination: `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=:date&itemPerPage=10`,
      },
      {
        source: "/get/tmdbNowPlaying/:page",
        destination: `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=ko-US&page=:page`,
      },
      {
        source: "/get/tmdb/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${TMDB_KEY}&language=ko-US`,
      },
      {
        source: "/get/tmdb/movies/credits/:id",
        destination: `https://api.themoviedb.org/3/movie/:id/credits?api_key=${TMDB_KEY}&language=ko-US`,
      },
      {
        source: "/get/tmdb/movies/similar/:id",
        destination: `https://api.themoviedb.org/3/movie/:id/similar?api_key=${TMDB_KEY}&language=ko-US`,
      },
      {
        source: "/get/tmdb/movies/recommendations/:id",
        destination: `https://api.themoviedb.org/3/movie/:id/recommendations?api_key=${TMDB_KEY}&language=ko-US`,
      },
      {
        source: "/get/tmdb/actors/:id",
        destination: `https://api.themoviedb.org/3/person/:id?api_key=${TMDB_KEY}&append_to_response=movie_credits,tv_credits`,
      },
    ];
  },
};

module.exports = nextConfig;

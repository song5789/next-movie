import { useEffect } from "react";
import dateFunc from "../../hook/dateFunc";
import SEO from "../../components/SEO";

const getDailyRanking = async () => {
  const dateQuery = dateFunc();
  const { boxOfficeResult } = await (await fetch(`https://next-movie-ten.vercel.app/get/todayRk/${dateQuery}`)).json();
  return boxOfficeResult;
};

const delayHandle = (time) => {
  return `${0.1 * time}s`;
};

export default function Home({ boxOfficeResult }) {
  const { boxofficeType: type, dailyBoxOfficeList: lists } = boxOfficeResult;
  const today = new Date();
  const yesterDay = new Date(today.getTime() - 1000 * 3600 * 24);
  return (
    <div>
      <SEO title={"국내 상영 랭킹"}></SEO>
      <div className="daily">
        <h1>극장 일일 박스오피스 Top 10</h1>
        {lists.map((v, index) => (
          <div key={v.movieCd}>
            <div className="daily-item" style={{ animationDelay: delayHandle(index) }}>
              <div className="rank">
                {v.rank} <span className={v.rankInten > 0 ? "rank-up" : "rank-down"}>{v.rankInten > 0 ? `↑${v.rankInten}` : `↓${v.rankInten.slice(1)}`}</span>
              </div>
              <div>{v.movieNm}</div>
              <div className={v.rankOldAndNew !== "OLD" ? "old-a-new  new" : "old-a-new  old"}>{v.rankOldAndNew !== "OLD" ? "NEW" : "-"}</div>
            </div>
          </div>
        ))}
        <div>{yesterDay.toLocaleDateString()} 기준</div>
      </div>
      <style jsx>
        {`
          .daily {
            max-width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #21252e;
            color: #fff;
            padding: 1rem;
          }
          .daily-item {
            width: 700px;
            height: 85px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            color: black;
            margin-bottom: 0.5rem;
            font-size: 18px;
            border-radius: 8px;
            transition: 0.2s;
            padding: 0.5rem;
            font-weight: 700;
            position: relative;
            animation: slideUP 0.7s ease-in-out forwards;
            opacity: 0;
          }

          .old-a-new {
            width: 50px;
            height: 30px;
            padding: 0.115rem;
            box-sizing: border-box;
            color: #fff;
            text-align: center;
            border-radius: 8px;
          }
          .new {
            background: green;
          }
          .old {
            background: gray;
          }
          .rank {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 25px;
            height: 100%;
            padding: 0.25rem;
            border-right: 1px solid rgba(0, 0, 0, 0.8);
          }
          .rank span {
            font-size: 13px;
            opacity: 0.5;
          }
          .rank-up {
            color: red;
          }
          .rank-down {
            color: blue;
          }
          @keyframes slideUP {
            0% {
              opacity: 0;
              transform: translateY(-20%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps() {
  const boxOfficeResult = await getDailyRanking();
  if (boxOfficeResult) {
    return {
      props: {
        boxOfficeResult,
      },
    };
  }
}

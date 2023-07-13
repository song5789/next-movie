import { useEffect, useState } from "react";
import SEO from "../../components/SEO";

async function getMoviePlaying() {
  const res = await fetch(`http://localhost:3000/get/tmdbNowPlaying`, { cache: "no-store" });
  const { results } = await res.json();
  return results;
}

export default function Home() {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    (async () => {
      const results = await getMoviePlaying().then((data) => {
        console.log(data);
        setLists((data) => {
          console.log(data);
          return data;
        });
      });
    })();
  }, []);
  if (lists.length === 0) return <div>11</div>;
  return (
    <div>
      <SEO title="Home" />
      <div>
        {lists.map((v) => {
          <div>{v.title}</div>;
        })}
      </div>
    </div>
  );
}

import Head from "next/head";

export default function SEO({ title }) {
  return (
    <Head>
      <title>{title} | 영화 사이트</title>
    </Head>
  );
}

import Head from "next/head";
import React from "react";

function SEO({ title }) {
  return (
    <Head>
      <title>{title} | 영화 사이트</title>
    </Head>
  );
}

export default React.memo(SEO);

import Layout from "components/Layout";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Layout title="Events@INP-HB">
      <Head>
        <title>Awesome App</title>
        <meta name="description" content="My awesome app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Layout>
  );
};

export default Home;

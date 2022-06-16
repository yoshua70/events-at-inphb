import Navbar from "components/Navbar";
import Head from "next/head";

type Props = {
  children?: JSX.Element[] | JSX.Element;
  title?: string;
};

const Layout = ({ children, title }: Props) => {
  return (
    <div className="flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="My awesome app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex flex-col md:m-auto">{children}</div>
    </div>
  );
};

export default Layout;

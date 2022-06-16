import { AppProps } from "next/app";
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
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default Layout;

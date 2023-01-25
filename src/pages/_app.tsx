import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Gunn Alumni</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`w-screen h-screen bg-gray-100`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

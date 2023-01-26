import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/nprogress.css";
import progress, { useNProgress } from "../utils/ServersideHelpers/nprogress";
import { ProgressBar } from "../components/hiddens/ProgressBar";
function MyApp({ Component, pageProps }: AppProps) {
  useNProgress()
  return (
    <>
      <Head>
        <title>Gunn Alumni</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProgressBar />
      <div className={`w-screen h-screen bg-gray-100`} id="root">
        
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

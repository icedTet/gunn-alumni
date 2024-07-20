import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/nprogress.css";
import progress, { useNProgress } from "../utils/ServersideHelpers/nprogress";
import { ProgressBar } from "../components/hiddens/ProgressBar";
import { useRouter } from "next/router";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { DirectoryViewer } from "../components/Users/ClassDirectory";
import { Navbar } from "../components/Navbar";
function MyApp({ Component, pageProps }: AppProps) {
  useNProgress();
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Gunn Alumni</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProgressBar />
      <div className={`w-screen h-screen bg-gray-50`} id="root">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

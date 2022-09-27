import { Web3ReactProvider } from "@web3-react/core";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Web3 from "web3";
import LayoutLanding from "../components/layout";
import "../styles/app.scss";

function MyApp({ Component, pageProps }: AppProps) {
  function getLibrary(provider: any) {
    return new Web3(provider);
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <LayoutLanding>
        <Component {...pageProps} />
      </LayoutLanding>
    </Web3ReactProvider>
  );
}

export default MyApp;

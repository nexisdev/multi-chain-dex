/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Layout, Tabs } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import MenuItems from "./components/MenuItems";
const { Header, Footer } = Layout;
import LogoName from "components/logo1.png";
import background from "components/svg0.png";

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
    backgroundImage: "url(${background})",
    background: "rgb(12, 14, 27",
    backgroundSize: "fill",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "1px solid rgb(46, 51, 92)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
    backgroundImage: "url(${background})",
    background: "rgb(12, 14, 27",
    backgroundSize: "fill",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <TokenPrice
              image="https://exzonetwork.mypinata.cloud/ipfs/QmVfkWAzVmc9D6Z8M4Vk5x5ffuLtJU4zwZUhSmXYTEj7dE"
              size="50px"
              margin="10px"
            />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/1inch">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>ETH</span>} key="1">
                  <DEX
                    chain="eth"
                    customTokens={{
                      "0x56501B0B12Ee9518c2991451Bbc8d7F9267949d2": {
                        address: "0x56501B0B12Ee9518c2991451Bbc8d7F9267949d2",
                        decimals: 9,
                        logoURI:
                          "https://bscscan.com/token/images/exzocoin2_32.png",
                        name: "ExzoCoin 2.0",
                        symbol: "EXZO",
                      },
                      "0xdAC17F958D2ee523a2206206994597C13D831ec7": {
                        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                        decimals: 6,
                        logoURI:
                          "https://etherscan.io/token/images/tether_32.png",
                        name: "Tether USD",
                        symbol: "TUSD",
                      },
                      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
                        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                        decimals: 6,
                        logoURI:
                          "https://etherscan.io/token/images/centre-usdc_28.png",
                        name: "USD Coin",
                        symbol: "USDC",
                      },
                      "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39": {
                        address: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
                        decimals: 8,
                        logoURI: "https://etherscan.io/token/images/hex_32.png",
                        name: "HEX",
                        symbol: "HEX",
                      },
                      "0x4Fabb145d64652a948d72533023f6E7A623C7C53": {
                        address: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/binanceusd_32.png",
                        name: "Binance USD",
                        symbol: "BUSD",
                      },
                      "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE": {
                        address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/shibatoken_32.png",
                        name: "Shiba Inu",
                        symbol: "SHIB",
                      },
                      "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0": {
                        address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/matic-polygon_32.png",
                        name: "Wrapped Matic",
                        symbol: "MATIC",
                      },
                      "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b": {
                        address: "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
                        decimals: 8,
                        logoURI: "https://etherscan.io/token/images/cro_32.png",
                        name: "Cronos Coin",
                        symbol: "CRONO",
                      },
                      "0x6B175474E89094C44Da98b954EedeAC495271d0F": {
                        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
                        decimals: 8,
                        logoURI:
                          "https://etherscan.io/token/images/MCDDai_32.png",
                        name: "Dai Stablecoin",
                        symbol: "DAI",
                      },
                      "0x514910771AF9Ca656af840dff83E8264EcF986CA": {
                        address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/chainlinktoken_32.png?v=6",
                        name: "ChainLink Token",
                        symbol: "LINK",
                      },
                      "0xE1Be5D3f34e89dE342Ee97E6e90D405884dA6c67": {
                        address: "0xE1Be5D3f34e89dE342Ee97E6e90D405884dA6c67",
                        decimals: 6,
                        logoURI:
                          "https://etherscan.io/token/images/trontrx_32.png?v=2",
                        name: "Tron Token",
                        symbol: "TRON",
                      },
                      "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": {
                        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/uniswap_32.png",
                        name: "Uniswap",
                        symbol: "UNI",
                      },
                      "0x75231F58b43240C9718Dd58B4967c5114342a86c": {
                        address: "0x75231F58b43240C9718Dd58B4967c5114342a86c",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/okex_28.png",
                        name: "OKB",
                        symbol: "OKB",
                      },
                      "0x3845badAde8e6dFF049820680d1F14bD3903a5d0": {
                        address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/sand_32.png",
                        name: "SAND Token",
                        symbol: "SAND",
                      },
                      "0xc944E90C64B2c07662A292be6244BDf05Cda44a7": {
                        address: "0xc944E90C64B2c07662A292be6244BDf05Cda44a7",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/TheGraph_32.png",
                        name: "Graph Token",
                        symbol: "GRAPH",
                      },
                      "0xf34960d9d60be18cC1D5Afc1A6F012A723a28811": {
                        address: "0xf34960d9d60be18cC1D5Afc1A6F012A723a28811",
                        decimals: 6,
                        logoURI:
                          "https://etherscan.io/token/images/kucointoken_32.png",
                        name: "kuCoin Token",
                        symbol: "KCS",
                      },
                      "0x4a220E6096B25EADb88358cb44068A3248254675": {
                        address: "0x4a220E6096B25EADb88358cb44068A3248254675",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/quantnetwork_28_2.png?v=2",
                        name: "Quant",
                        symbol: "QNT",
                      },
                      "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2": {
                        address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
                        decimals: 18,
                        logoURI:
                          "https://etherscan.io/token/images/mkr-etherscan-35.png",
                        name: "Maker",
                        symbol: "MKR",
                      },
                    }}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>BSC</span>} key="2">
                  <DEX
                    chain="bsc"
                    customTokens={{
                      "0xF8fC63200e181439823251020d691312FDcF5090": {
                        address: "0xF8fC63200e181439823251020d691312FDcF5090",
                        decimals: 9,
                        logoURI:
                          "https://bscscan.com/token/images/exzocoin2_32.png",
                        name: "ExzoCoin 2.0",
                        symbol: "EXZO",
                      },
                      "0x52419258E3fa44DEAc7E670eaDD4c892B480A805": {
                        address: "0x52419258E3fa44DEAc7E670eaDD4c892B480A805",
                        decimals: 9,
                        logoURI:
                          "https://bscscan.com/token/images/starship_32.png?v=12",
                        name: "StarShip",
                        symbol: "STARSHIP",
                      },
                      "0x1ce0c2827e2ef14d5c4f29a091d735a204794041": {
                        address: "0x1ce0c2827e2ef14d5c4f29a091d735a204794041",
                        decimals: 18,
                        logoURI: "https://bscscan.com/token/images/avax_32.png",
                        name: "Binance-Peg Avalanche Token",
                        symbol: "AVAX",
                      },
                    }}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>POLY</span>} key="3">
                  <DEX
                    chain="polygon"
                    customTokens={{
                      "0x6F1Bc0967945465539877b39ba48373b0219248f": {
                        address: "0x6F1Bc0967945465539877b39ba48373b0219248f",
                        decimals: 9,
                        logoURI:
                          "https://bscscan.com/token/images/exzocoin2_32.png",
                        name: "ExzoCoin 2.0",
                        symbol: "EXZO",
                      },
                    }}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>AVAX</span>} key="4">
                  <DEX
                    chain="avalanche"
                    customTokens={{
                      FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z: {
                        address:
                          "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
                        decimals: 18,
                        logoURI: "https://bscscan.com/token/images/avax_32.png",
                        name: "Avalanche Token",
                        symbol: "AVAX",
                      },
                      "0x5947bb275c521040051d82396192181b413227a3": {
                        address: "0x5947bb275c521040051d82396192181b413227a3",
                        decimals: 18,
                        logoURI:
                          "https://snowtrace.io/token/images/chainlinktoken_32.png",
                        name: "Chainlink Token",
                        symbol: "LINK",
                      },
                      "0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15": {
                        address: "0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15",
                        decimals: 18,
                        logoURI:
                          "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
                        name: "Wrapped Ethereum",
                        symbol: "ETH",
                      },
                    }}
                  />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/">
              <Redirect to="/1inch" />
            </Route>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/quickstart" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img
      src={LogoName}
      alt="Exzo Network Logo"
      width="250px"
      size="55px"
      margin-left="50px"
      padding-left="50px"
    />
  </div>
);

export default App;

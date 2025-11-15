import { useEffect, useState } from "react";
import "./App.css";
import { initWeb3Modal } from "./controller/initWeb3Modal";
import { initEthWallet } from "./controller/initEthWallet";
import { useWalletData } from "./hooks/useWalletData";

const config = {
  web3Modal: "mainnet", //測試網路
};

function App() {
  const [ethWallet, setEthWallet] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { address, balance, lookupEns, update } = useWalletData(ethWallet);

  useEffect(() => {
    // 初始化錢包連接
    (async () => {
      try {
        setLoading(true);
        const web3Modal = await initWeb3Modal(config.web3Modal);
        const ethWallet = await initEthWallet(web3Modal);

        console.log("%cWALLET", "color:red;font-size:30px", {
          web3Modal,
          ethWallet,
        });
        setEthWallet(ethWallet);

        setError(null);
      } catch (err) {
        console.error("Failed to connect wallet:", err);
        setError(
          err instanceof Error ? err.message : "Failed to connect wallet"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="App">
      <section>
        <h1>Eth wallet</h1>
        <div>address:{address}</div>
        <div>balance:{balance}</div>
        <div>lookupEns:{lookupEns}</div>
        <button onClick={update} disabled={!ethWallet}>
          重新整理餘額
        </button>
      </section>

      <section>
        {loading && <p>Connecting to wallet...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {ethWallet && !error && <p>Wallet connected successfully!</p>}
      </section>
    </div>
  );
}

export default App;

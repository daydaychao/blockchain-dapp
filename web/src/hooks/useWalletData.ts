import { useEffect, useState, useCallback } from "react";

export const useWalletData = (ethWallet: any) => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [lookupEns, setLookupEns] = useState<string>("");

  // 提供給外部調用的更新函數
  const update = useCallback(async () => {
    if (!ethWallet) return;

    try {
      const addr = await ethWallet.getAddress();
      setAddress(addr);

      const bal = await ethWallet.getBalance();
      setBalance(bal.toString());

      const ens = await ethWallet.lookupEns();
      setLookupEns(ens || "No ENS name");
    } catch (err) {
      console.error("Failed to fetch wallet data:", err);
    }
  }, [ethWallet]);

  useEffect(() => {
    // 初始化時自動獲取一次
    update();
  }, [update]);

  return { address, balance, lookupEns, update };
};

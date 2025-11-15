import { ethers } from "ethers";

export const initEthWallet = async (instance: any) => {
  const provider = new ethers.providers.Web3Provider(instance);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const getAddress = async () => {
    return await signer.getAddress();
  };

  const getBalance = async () => {
    const address = await signer.getAddress();
    return await provider.getBalance(address);
  };

  const lookupEns = async () => {
    const address = await signer.getAddress();
    return await provider.lookupAddress(address);
  };

  return {
    provider,
    signer,
    getAddress,
    getBalance,
    lookupEns,
  };
};

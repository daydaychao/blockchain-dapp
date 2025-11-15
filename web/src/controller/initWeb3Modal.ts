import Web3Modal from "web3modal";

export const initWeb3Modal = async (networkKey: string) => {
  const web3Modal = new Web3Modal({
    network: networkKey,
    cacheProvider: true, // optional
    providerOptions: {},
  });
  const instance = await web3Modal.connect();
  return instance;
};

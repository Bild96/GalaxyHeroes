import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import { NextPage } from "next";

const Home: NextPage = () => {
  const nftDropAddress = "0x2e875bD4419b5F2C2003Ca7417A6dDCc1794bad8";
  const editionDropAddress = "0x2B4DA3e229d80b4cdba1E233405ba79e7557dd53";
  const tokenAddress = "0x1964860F9ff6ab7689d54Fee92045bAA3FF28D5A";

  const [nftDropTotalMinted, setNftDropTotalMinted] = useState<BigInt>();
  const [editionDropTotalMinted, setEditionDropTotalMinted] = useState<BigInt>();
  const [tokenBalance, setTokenBalance] = useState<BigInt>();

  useEffect(() => {
    const fetchData = async () => {
      const nftDropContract = await useContract(nftDropAddress);
      const editionDropContract = await useContract(editionDropAddress);
      const tokenContract = await useContract(tokenAddress);

      setNftDropTotalMinted(await nftDropContract.totalMinted());
      setEditionDropTotalMinted(await editionDropContract.totalSupply(5));
      setTokenBalance(await tokenContract.balanceOf(address));
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
        <h1>Galaxy Heroes</h1>
        {nftDropTotalMinted && (
          <p>Total NFTs minted: {nftDropTotalMinted}</p>
        )}
        <Web3Button
          contractAddress={nftDropAddress}
          action={(contract) => contract.erc721.claim(1)}
        >Claim NFT Drop</Web3Button>
        <br />
        {editionDropTotalMinted && (
          <p>Total Editions minted: {editionDropTotalMinted}</p>
        )}
        <Web3Button
          contractAddress={editionDropAddress}
          action={(contract) => contract.erc1155.claim(0, 1)}
          >Claim Edition NFT</Web3Button>
          <br />
          {tokenBalance && (
            <p>Total balance: {ethers.utils.formatUnits(tokenBalance, 18)}</p>
          )}
      </main>
    </div>
  );
};

export default Home;


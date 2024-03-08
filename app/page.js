'use client';

import { useState, useEffect } from "react";
import { ethers } from "ethers";

import Overview from "./components/Overview";
import Assets from "./components/Assets";
import Values from "./components/Values";
import Holdings from "./components/Holdings";

export default function Home() {

  const [account, setAccount] = useState(null);
  const [trackedTokens, setTrackedTokens] = useState([]);

  const [markets, setMarkets] = useState(null);
  const [tokens, setTokens] = useState([]);

  const getMarkets = async () => {
    const BASE_URL = `https://api.coingecko.com/api/v3`
    const ENDPOINT = `/coins/markets`
    const AMOUNT = 25
    const ARGUMENTS = `?vs_currency=usd&category=ethereum-ecosystem&order=market_cap_desc&per_page=${AMOUNT}&page=1&sparkline=false&locale=en`

    const response = await fetch(BASE_URL + ENDPOINT + ARGUMENTS)

    setMarkets(await response.json())
  }

  const getToken = async () => {
    const id = trackedTokens[trackedTokens.length - 1];
    
    const market = markets.find(market => market.id === id);

    // Fetch token details via API request (we just need the contract address)
    const BASE_URL = `https://api.coingecko.com/api/v3`
    const TOKEN_ENDPOINT = `/coins/${id}`
    const TOKEN_ARGUMENTS = `?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false&no-cors`
    const url = BASE_URL + TOKEN_ENDPOINT + TOKEN_ARGUMENTS;

    const tokenResponse = await fetch(url);
    const tokenSnapshot = await tokenResponse.json(); 
    const details = await tokenSnapshot.detail_platforms.ethereum;

    // Prices
    const PRICES_ENDPOINT = `/coins/${id}/market_chart`;
    const PRICES_ARGUMENTS = `?vs_currency=usd&days=7&interval=daily`;

    const pricesResponse = await fetch(BASE_URL + PRICES_ENDPOINT + PRICES_ARGUMENTS);
    const prices = (await pricesResponse.json()).prices;

    // Fetch Balance
    const ETH_URL = 'https://rpc.ankr.com/eth';
    const provider = new ethers.JsonRpcProvider(ETH_URL);
    const contractAbi = ["function balanceOf(address) view returns (uint)"]

    let balance;
    if (details) {
      const contract = new ethers.Contract(details.contract_address, contractAbi, provider);
      balance = Number(ethers.formatUnits(await contract.balanceOf(account), details.decimal_place));
    } else {
      balance = Number(ethers.formatEther(await provider.getBalance(account)));
    }

    const token = {
      id,
      market,
      address: details ? details.contract_address : null,
      prices,
      balance,
      value: market.current_price * balance
    };
    setTokens([...tokens, token]);
  };

  useEffect(() => {
      if (!markets) {
        getMarkets();
      }

      if (trackedTokens.length !== 0) {
        getToken();
      }
    }, [trackedTokens]
  );

  return (
    <main>
      <h2>Portfolio Overview</h2>
      <Overview 
        account={account} 
        setAccount={setAccount}
        markets={markets}
        trackedTokens={trackedTokens}
        setTrackedTokens={setTrackedTokens}
        tokens={tokens}
      />
      <div className="details">
        <div className="divider"></div>
        <Holdings
          tokens={tokens} 
        />
        <Values
          tokens={tokens} 
        />
        <Assets
          tokens={tokens} 
          setTokens={setTokens}
        />
      </div>
    </main>
  )
}

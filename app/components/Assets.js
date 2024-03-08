import { useState } from 'react';

import Image from 'next/image';

import Token from './Token';

import minus from '../assets/minus.svg';

const Assets = ({ tokens, setTokens }) => {

  const [token, setToken] = useState(null);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  
  const tokenModalHandler = (token) => {
    setToken(token);
    setIsTokenModalOpen(true);
  };

  const removeHandler = (token) => {
    if (tokens.length === 1) {
      setTokens([]);
    } else {
      const index = tokens.indexOf(tokens.find(t => t.id === token.id));
      const tokensArray = tokens.slice();
      tokensArray.splice(index, 1);
      setTokens(tokensArray);
    }
  };

  return (
    <div className="assets">
      <h3>My Assets</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Token</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Holdings</th>
            <th>Total Value <small>(USD)</small></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td>{++index}</td>
              <td>{token.market.name}</td>
              <td>{token.market.symbol.toUpperCase()}</td>
              <td>{token.market.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td>{token.balance}</td>
              <td>{token.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td>
                <button onClick={() => tokenModalHandler(token)}>Details</button>
              </td>
              <td>
                <button className="untrack" onClick={() => removeHandler(token)}>
                  <Image
                    src={minus}
                    width={20}
                    height={20}
                    alt='Untrack token'
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {isTokenModalOpen &&
        <Token
          token={token}
          setIsTokenModalOpen={setIsTokenModalOpen}
      />}
      
    </div>
  );
}

export default Assets;

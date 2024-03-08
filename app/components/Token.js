import Image from 'next/image';

import close from '../assets/close.svg';
import down from '../assets/down.svg';
import up from '../assets/up.svg';

const Token = ({ token, setIsTokenModalOpen }) => {

	const closeHandler = () => {
		setIsTokenModalOpen(false);
	};

	return (
    <div className="popup">
      <div className="popup__content account">
				<div className="token__title">
					<Image
						src={token.market.image}
            width={40}
            height={40}
            alt='Token image'
					/>
					<h3>{token.market.name}<small>{token.market.symbol.toUpperCase()}</small></h3>
				</div>
				<hr/>
				<div className='token__price'>
					<p>
						<small>
							{token.market.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
							<Image
								src={token.market.price_change_percentage_24h >= 0 ? up :down}
								width={15}
								height={15}
								alt='Change direction'
							/>
							<span className={token.market.price_change_percentage_24h < 0 ? 'red' : 'green'}>
								{token.market.price_change_percentage_24h.toFixed(2)}%
							</span>
						</small>
					</p>
				</div>
				<hr/>
				<div className='token__details'>
					<div>
						<h4>All Time High</h4>
						<p>{token.market.ath.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
					</div>
					<div>
						<h4>Market Cap</h4>
						<p>{token.market.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
					</div>
					<div>
						<h4>Circulating Supply</h4>
						<p>{token.market.circulating_supply.toLocaleString('en-US')}</p>
					</div>
					<div>
						<h4>Total Supply</h4>
						<p>{token.market.total_supply.toLocaleString('en-US')}</p>
					</div>
					<div>
						<h4>Max Supply</h4>
						<p>{token.market.max_supply ? token.market.max_supply.toLocaleString('en-US') : (<>&infin;</>)}</p>
					</div>
					{ token.address && (
						<div>
						<h4>Contract Address</h4>
						<p>{token.address}</p>
					</div>
					)}
				</div>
				<button onClick={closeHandler}>
					<Image
            src={close}
            width={15}
            height={15}
            alt='Close popup'
          />
				</button>
			</div>
		</div>
  );
}

export default Token;

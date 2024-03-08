import { useEffect, useState } from 'react';

import Image from 'next/image';

import Account from './Account';
import Add from './Add';

import up from '../assets/up.svg';
import down from '../assets/down.svg';
import add from '../assets/add.svg';

const Overview = ({ account, setAccount, markets, trackedTokens, setTrackedTokens, tokens }) => {
	
	const [value, setValue] = useState(0);
	const [percentageChange, setPercentageChange] = useState(0);

	const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
	const [isAddTokenModalOpen, setIsAddTokenModalOpen] = useState(false);

	const accountModalHandler = () => {
		setIsAccountModalOpen(true);
	};

	const tokenModalHandler = () => {
		if (account) {
			setIsAddTokenModalOpen(true);
		} else {
			setIsAccountModalOpen(true);
		}
	};

	const calculateValue = () => {
		const total = tokens.reduce((sum, current) => {
			if (current.balance > 0) {
				sum += current.value;
			}
			return sum;
		}, 0);
		setValue(total);
	};

	const calculatePercentageChange = () => {
		let total = 0;
		tokens.forEach(token => {
			if (token.balance > 0) {
				const previousValue = (token.market.current_price - token.market.price_change_24h) * token.balance;
				const currentValue = token.value;
				const change = ((currentValue - previousValue) / previousValue) * 100;
				total += change;
			}
		});
		setPercentageChange(total);
	};

	useEffect(() => {
		if (tokens && tokens.length === 0) {
			setValue(0);
			setPercentageChange(0);
		} else {
			calculateValue();
			calculatePercentageChange();
		}
	});

	return (
		<div className="overview">
			<div className="overview__account">
				<h3>Account</h3>
        {account ? (
          <p>{account.slice(0,6) + '...' + account.slice(-4)}</p>
        ) : (
					<button onClick={accountModalHandler}>
						<Image
							src={add}
							width={20}
							height={20}
							alt='Set account'
						/>
					</button>
				)}
			</div>
			<div className="overview__tracked">
				<h3>Assets Tracked</h3>
				<p>{trackedTokens.length}</p>
				{/* <p>{tokens.length}</p> */}
				<button onClick={tokenModalHandler}>
					<Image
						src={add}
						width={20}
						height={20}
						alt='Add token'
					/>
				</button>
			</div>
			<div className="overview__total">
				<h3>Total Value</h3>
				<p>{value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
			</div>
			<div className="overview__change">
				<h3>% Change</h3>
				<p>
				<Image
						src={percentageChange >= 0 ? up :down}
						width={20}
						height={20}
						alt='Change direction'
					/>
					<span className={percentageChange >= 0 ? 'green' : 'red'}>{percentageChange.toFixed(2)}%</span>
				</p>
			</div>

			{isAccountModalOpen && 
				<Account
					setIsAccountModalOpen={setIsAccountModalOpen}
					setAccount={setAccount}
				/>
			}

			{isAddTokenModalOpen &&
				<Add
					setIsAddTokenModalOpen={setIsAddTokenModalOpen}
					markets={markets}
					trackedTokens={trackedTokens}
					setTrackedTokens={setTrackedTokens}
				/>
			}

		</div>
	)
}

export default Overview;

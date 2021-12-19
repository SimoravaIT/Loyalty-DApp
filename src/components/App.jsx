import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import UsiToken from '../abis/UsiToken.json';
import DaiToken from '../abis/DaiToken.json';
import TokenFarm from '../abis/TokenFarm.json';
import styled from 'styled-components';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Header from './Header';
import Home from './Home';
import Staking from './Staking';

const App = () => {
	//all value needed from the blockchain:
	//smart contracts
	const [account, setAccount] = useState('0x0');
	const [daiToken, setDaiToken] = useState('0x0');
	const [usiToken, setUsiToken] = useState('0x0');
	const [tokenFarm, setTokenFarm] = useState('0x0');
	//balances
	const [daiTokenBalance, setDaiTokenBalance] = useState(0);
	const [usiTokenBalance, setUsiTokenBalance] = useState(0);
	const [stakingBalance, setStakingBalance] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadWeb3();
	}, []);

	const loadWeb3 = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
			loadBlockchainData();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
			loadBlockchainData();
		} else {
			window.alert('Non ethereum browser detected, use metamask');
		}
	};

	const loadBlockchainData = async () => {
		const web3 = window.web3;
		//account showed in metamask and in ganahche
		const accounts = await web3.eth.getAccounts();

		setAccount(accounts[0]);
		console.log('account: ' + accounts[0]);
		//5777 che é il network id per ganache nel json file
		const networkId = await web3.eth.net.getId();
		console.log('netID, should be 5777: ' + networkId);
		//prendiamo usiToken values dal json file, dal json deriviamo l address utilizzando network id

		const usiTokenData = UsiToken.networks[networkId];
		console.log(
			'usitoken address , should be 0x901...FA4: ' + usiTokenData.address,
		);
		if (usiTokenData) {
			//address of usiToken gained from the json file
			const newUsiToken = new web3.eth.Contract(
				UsiToken.abi,
				usiTokenData.address,
			);
			setUsiToken(newUsiToken);
			console.log(
				'usi token balance =' +
					(await newUsiToken.methods.balanceOf(accounts[0]).call()),
			);
			const newUsiTokenBalance = await newUsiToken.methods
				.balanceOf(accounts[0])
				.call();
			setUsiTokenBalance(newUsiTokenBalance);
		} else {
			window.alert('UsiToken contract not deployed to detected network');
		}

		const daiTokenData = DaiToken.networks[networkId];
		console.log('daiToken address: ' + daiTokenData.address);
		if (daiTokenData) {
			const newDaiToken = new web3.eth.Contract(
				DaiToken.abi,
				daiTokenData.address,
			);
			//address of daiToken gained from the json file
			setDaiToken(newDaiToken);
			console.log(
				'dai token balance =' +
					(await newDaiToken.methods.balanceOf(accounts[0]).call()),
			);
			const newDaiTokenBalance = await newDaiToken.methods
				.balanceOf(accounts[0])
				.call();
			setDaiTokenBalance(newDaiTokenBalance);
		} else {
			window.alert('UsiToken contract not deployed to detected network');
		}

		const tokenFarmData = TokenFarm.networks[networkId];
		console.log('tokenfarm address: ' + daiTokenData.address);
		if (tokenFarmData) {
			const newTokenFarm = new web3.eth.Contract(
				TokenFarm.abi,
				tokenFarmData.address,
			);
			setTokenFarm(newTokenFarm);
			console.log(
				'staking balance =' +
					(await newTokenFarm.methods
						.stakingBalance(accounts[0])
						.call()),
			);
			const newStakingBalance = await newTokenFarm.methods
				.stakingBalance(accounts[0])
				.call();
			setStakingBalance(newStakingBalance);
		} else {
			window.alert('UsiToken contract not deployed to detected network');
		}
		setLoading(false);
	};

	return (
		<StyledFullPage>
			<Router basename={'/'}>
				<Header />
				{loading ? (
					<StyledLoading>
						<Loader
							type="Bars"
							color="rgba(0, 0, 0, 0.75)"
							height={100}
							width={100}
						/>
					</StyledLoading>
				) : (
					<Routes>
						<Route path="/staking" element={<Staking />} />

						<Route
							exact
							path="/"
							element={
								<Home
									account={account}
									usiTokenBalance={usiTokenBalance}
									daiTokenBalance={daiTokenBalance}
									stakingBalance={stakingBalance}
								/>
							}
						/>
						<Route
							exact
							path="/"
							element={
								<Staking
									account={account}
									usiTokenBalance={usiTokenBalance}
									daiTokenBalance={daiTokenBalance}
									stakingBalance={stakingBalance}
								/>
							}
						/>

						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				)}
			</Router>
		</StyledFullPage>
	);
};

const StyledFullPage = styled.div`
	height: 100vh;
	min-height: 700px;
	color: black;
`;

const StyledLoading = styled.div`
	height: 94vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default App;

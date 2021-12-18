import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import UsiToken from '../abis/UsiToken.json';
import DaiToken from '../abis/DaiToken.json';
import styled from 'styled-components';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Navbar from './Header';
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
	const [tokenFarmBalance, setTokenFarmBalance] = useState(0);
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
		setAccount(accounts[0]); //accounts 0 or accounts?? -> è un array ma di un solo elemento, quindi accounts[0].
		//5777 che é il network id per ganache nel json file
		const networkId = await web3.eth.net.getId();

		//prendiamo usiToken values dal json file, dal json deriviamo l address utilizzando network id
		const usiTokenData = UsiToken.networks[networkId];
		if (usiTokenData) {
			//const usiToken = new web3.eth.Contract(UsiToken.abi, usiTokenData.address)
			//address of usiToken gained from the json file
			const newUsiToken = new web3.eth.Contract(
				UsiToken.abi,
				usiTokenData.address,
			);
			setUsiToken(newUsiToken);
			// console.log(newUsiToken.methods.balanceOf({ account }).call);
			// come vedi dal console log qui sopra, fino a questo punto funziona. Non so a te, ma a me si rompe se chiamo "call"
			//perche qua nn riesco a prendere account e devo prendere 0?
			// const newUsiTokenBalance = await usiToken.methods
			// 	.balanceOf(accounts[0])
			// 	.call();
			// setUsiTokenBalance(newUsiTokenBalance);
		} else {
			window.alert('UsiToken contract not deployed to detected network');
		}

		const daiTokenData = DaiToken.networks[networkId];
		if (daiTokenData) {
			const daiToken = new web3.eth.Contract(
				DaiToken.abi,
				daiTokenData.address,
			);
			//address of daiToken gained from the json file
			setDaiToken(daiToken);
			//perche qua nn riesco a prendere account ?
			setDaiTokenBalance(
				await daiToken.methods.balanceOf(accounts[0]).call(),
			);
			console.log(await daiToken.methods.balanceOf(accounts[0]).call());
		} else {
			window.alert('UsiToken contract not deployed to detected network');
		}
	};

	return (
		<StyledFullPage>
			<Router basename={'/'}>
				<Navbar />
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
							/>
						}
					/>

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</StyledFullPage>
	);
};

const StyledFullPage = styled.div`
	height: 100vh;
	min-height: 700px;
	color: black;
`;

export default App;

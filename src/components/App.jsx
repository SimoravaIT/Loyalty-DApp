import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
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
	const [account, setAccount] = useState('0x0');

	useEffect(() => {
		loadWeb3();
	});

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

		const accounts = await web3.eth.getAccounts();
		console.log();
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
						element={<Home account={account} />}
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

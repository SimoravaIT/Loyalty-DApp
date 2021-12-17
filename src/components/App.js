import React, { Component } from 'react';
import Web3 from 'web3'
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

class App extends Component {

	async componentWillMount(){
		await this.loadWeb3()
		await this.loadBlockchainData()
	}

	async loadBlockchainData(){
		const web3 = window.web3

		const accounts = await web3.eth.getAccounts()
		console.log()
	}
	async loadWeb3(){
		if(window.ethereum){
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		}
		else if(window.web3){
			window.web3=new Web3(window.web3.currentProvider)
		}
		else{
			window.alert('Non ethereum browser detected, use metamask')
		}

	}


	constructor(props) {
		super(props);
		this.state = {
			account: '0x0',
		};
	}
	render() {
		return (
			<StyledFullPage>
				<Router basename={'/'}>
					<Navbar account={this.state.account} />
					<Routes>
						<Route path="/staking" element={<Staking />} />

						<Route exact path="/" element={<Home />} />

						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Router>
			</StyledFullPage>
		);
	}
}

const StyledFullPage = styled.div`
	height: 100vh;
	min-height: 700px;
	color: black;
`;

export default App;

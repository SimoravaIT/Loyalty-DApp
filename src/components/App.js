import React, { Component } from 'react';
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

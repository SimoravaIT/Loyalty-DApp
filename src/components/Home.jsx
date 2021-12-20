import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const menu = [
	{
		name: 'Staking',
		path: 'staking',
	},
	{
		name: 'Survey',
		path: 'survey',
	},
];

const Home = ({
	account,
	usiTokenBalance,
	daiTokenBalance,
	stakingBalance,
}) => {
	return (
		<StyledHome>
			<StyledTitle>Welcome to the USI Loyalty DAPP</StyledTitle>
			<StyledText>Select one of the following options:</StyledText>
			<StyledMenuContainer>
				{menu.map(({ name, path, color = 'rgb(0, 0, 0)' }) => (
					<StyledLink to={path} color={color} key={path}>
						{name}
					</StyledLink>
				))}
			</StyledMenuContainer>
			<StyledTrade to="trade" color="rgb(0, 0, 0)" key="trade">
				Trade
			</StyledTrade>
			<StyledInfoContainer>
				<StyledInfo>Your current address is:</StyledInfo>
				<StyledValue>{account}</StyledValue>
				<StyledInfo>
					Your current <b>USI Token</b> balance is:
				</StyledInfo>
				<StyledValue>
					{window.web3.utils.fromWei(usiTokenBalance, 'Ether')}
				</StyledValue>
				<StyledInfo>
					Your current <b>DAI Token</b> balance is:
				</StyledInfo>
				<StyledValue>
					{window.web3.utils.fromWei(daiTokenBalance, 'Ether')}
				</StyledValue>
				<StyledInfo>
					Your current <b>Staking balance</b> is:
				</StyledInfo>
				<StyledValue>
					{window.web3.utils.fromWei(stakingBalance, 'Ether')}
				</StyledValue>
			</StyledInfoContainer>
		</StyledHome>
	);
};

const StyledHome = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 94vh;
	padding-left: 30px;
	padding-right: 30px;
	padding-top: 6vh;
`;

const StyledTitle = styled.div`
	padding: 10px;
	font-size: 30px;
	font-weight: bold;
`;

const StyledText = styled.div`
	font-size: 22px;
`;

const StyledInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 500px;
`;

const StyledInfo = styled.div`
	font-size: 1em;
	border-top: 2px solid black;
	font-weight: bold;
	width: fit-content;
	padding-right: 10px;
`;

const StyledValue = styled.div`
	font-size: 1em;
	padding-bottom: 20px;
`;

const StyledMenuContainer = styled.div`
	padding-top: 30px;
	width: 325px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
	align-content: center;
`;

const StyledLink = styled(Link)`
	display: grid;
	padding: 0px 35px;
	width: min-content;
	height: min-content;
	border-top: 2px solid ${({ color }) => color};
	border-bottom: 2px solid ${({ color }) => color};
	color: ${({ color }) => color};
	text-decoration: none;
	transition: all 0.25s;
	font-size: 1.4em;
	&:hover {
		font-weight: bold;
		color: black;
		text-decoration: none;
	}
`;

const StyledTrade = styled(Link)`
	display: grid;
	margin-top: 15px;
	margin-bottom: 10vh;
	padding: 0px 35px;
	width: min-content;
	height: min-content;
	border-top: 2px solid ${({ color }) => color};
	border-bottom: 2px solid ${({ color }) => color};
	color: ${({ color }) => color};
	text-decoration: none;
	text-align: center;
	transition: all 0.25s;
	font-size: 1.4em;
	&:hover {
		font-weight: bold;
		color: black;
		text-decoration: none;
	}
`;

export default Home;

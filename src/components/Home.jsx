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

const Home = () => {
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
			<StyledText>
				You current <b>USI Token</b> balance is:
			</StyledText>
			<StyledText>XXX</StyledText>
		</StyledHome>
	);
};

const StyledHome = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 94vh;
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

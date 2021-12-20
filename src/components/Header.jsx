import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import USI_logo from '../usi-logo.png';

const Header = (account) => {
	return (
		<StyledHeader>
			<StyledLeft>
				<StyledLink to="/" key="/">
					<img src={USI_logo} height={40} alt="usi-logo" />
				</StyledLink>
			</StyledLeft>
			<StyledCenter>Loyalty DAPP</StyledCenter>
			<StyledRight>Distributed Systems, 2021</StyledRight>
		</StyledHeader>
	);
};

const StyledHeader = styled.div`
	height: 6vh;
	padding-left: 15px;
	padding-right: 15px;
	min-height: 45px;
	background: white;
	border-bottom: 2px solid black;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	align-content: center;
`;

const StyledLeft = styled.div`
	//
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	&:hover {
		text-decoration: none;
	}
`;

const StyledCenter = styled.div`
	text-align: center;
	font-size: 22px;
	font-weight: bold;
`;

const StyledRight = styled.div`
	text-align: right;
`;

export default Header;

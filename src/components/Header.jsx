import React from 'react';
import styled from 'styled-components';

const Header = (account) => {
	return (
		<StyledHeader>
			<StyledLeft>blah blah</StyledLeft>
			<StyledCenter>blah blah</StyledCenter>
			<StyledRight>blah blah</StyledRight>
		</StyledHeader>
	);
};

const StyledHeader = styled.div`
	height: 5vh;
	min-height: 35px;
	background: gray;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	align-content: center;
`;

const StyledLeft = styled.div`
	//
`;

const StyledCenter = styled.div`
	//
`;

const StyledRight = styled.div`
	//
`;

export default Header;

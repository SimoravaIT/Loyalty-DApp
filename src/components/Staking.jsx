import React from 'react';
import styled from 'styled-components';

const Staking = ({ account,usiTokenBalance,daiTokenBalance,stakingBalance }) => {
	return( 
		//	<td>{window.web3.utils.fromWei(stakingBalance, 'Ether')} Dai</td>
		//<td>{window.web3.utils.fromWei(usiTokenBalance, 'Ether')} USITK</td>
	//<StyledStaking>Staking time</StyledStaking>
		<table className = "table table-borderless text-muted text center">
			<thread>
				<tr>
					<th scope = 'col'>Staking Balance</th>
					<th scope = 'col'>Reward Balance</th>
				</tr>
			</thread>
			<tbody>
				<tr>
				
					<td>{stakingBalance} Dai</td>
					<td>{usiTokenBalance} USITK</td>
				</tr>
			</tbody>
		</table> 
		
	);
};

const StyledStaking = styled.div``;

export default Staking;

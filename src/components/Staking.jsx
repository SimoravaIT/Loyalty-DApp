import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Staking = ({
	account,
	usiTokenBalance,
	daiTokenBalance,
	stakingBalance,
	daiToken,
	tokenFarm,
	totalGained,
	setStakingBalance,
	setDaiTokenBalance,
}) => {
	const [currentIsStake, setCurrentIsStake] = useState(true);
	const [switchHover, setSwitchHover] = useState(false);
	const { register, handleSubmit } = useForm();

	const onClickSwitch = () => {
		setCurrentIsStake(!currentIsStake);
	};

	const onSwitchHover = () => {
		setSwitchHover(true);
	};

	const onSwitchOut = () => {
		setSwitchHover(false);
	};

	const onSubmitStake = async (data) => {
		const stakingValue = data.stakingValue;
		if (isNaN(stakingValue)) {
			alert('Insert a valid value');
			return;
		}

		if (stakingValue > 0) {
			daiToken.methods
				.approve(
					tokenFarm._address,
					window.web3.utils.toWei(stakingValue, 'Ether').toString(),
				)
				.send({ from: account })
				.then(function() {
					tokenFarm.methods
						.stakeTokens(
							window.web3.utils
								.toWei(stakingValue, 'Ether')
								.toString(),
						)
						.send({ from: account })
						.then(function() {
							tokenFarm.methods
								.stakingBalance(account)
								.call()
								.then(function(x) {
									setStakingBalance(x);
								});
						})
						.then(function() {
							daiToken.methods
								.balanceOf(account)
								.call()
								.then(function(y) {
									setDaiTokenBalance(y);
								});
						});
				});
		} else {
			alert('Insert a valid value');
		}
	};

	const onSubmitUnstake = async (data) => {
		const unstakingValue = data.unstakingValue;
		if (isNaN(unstakingValue)) {
			alert('Insert a valid value');
			return;
		}

		if (unstakingValue > 0) {
			tokenFarm.methods
				.unstakeNTokens(
					window.web3.utils.toWei(unstakingValue, 'Ether'),
				)
				.send({ from: account })
				.then(function() {
					tokenFarm.methods
						.stakingBalance(account)
						.call()
						.then(function(x) {
							setStakingBalance(x);
						});
				})
				.then(function() {
					daiToken.methods
						.balanceOf(account)
						.call()
						.then(function(y) {
							setDaiTokenBalance(y);
						});
				});
		} else {
			alert('Insert a valid value');
		}
	};

	return (
		<StyledStaking>
			<StyledBody>
				<StyledTitle>Stake DAI to get USI_Tk</StyledTitle>
				<StyledBalances>
					<StyledStakingBalance>
						Staking Balance:{' '}
						<b>
							{window.web3.utils.fromWei(stakingBalance, 'Ether')}{' '}
							DAI
						</b>
					</StyledStakingBalance>
					<StyledRewardBalance>
						Reward Balance:{' '}
						<b>
							{window.web3.utils.fromWei(totalGained, 'Ether')}{' '}
							USI_Tk
						</b>
					</StyledRewardBalance>
				</StyledBalances>
				<StyledSwitch
					onClick={onClickSwitch}
					onMouseOver={onSwitchHover}
					onMouseOut={onSwitchOut}
				>
					<StyledInnerSwitch>
						<StyledStake currentIsStake={currentIsStake}>
							Stake
						</StyledStake>
						<StyledArrow switchHover={switchHover}>↔</StyledArrow>
						<StyledUnstake currentIsStake={currentIsStake}>
							Unstake
						</StyledUnstake>
					</StyledInnerSwitch>
				</StyledSwitch>
				{currentIsStake ? (
					<StakingForm onSubmit={handleSubmit(onSubmitStake)}>
						<StyledInput
							{...register('stakingValue')}
							placeholder="Amount of DAI to stake"
							currentIsStake={currentIsStake}
						/>
						<StyledSubmit type="submit" value={'STAKE'} />
					</StakingForm>
				) : (
					<StakingForm onSubmit={handleSubmit(onSubmitUnstake)}>
						<StyledInput
							{...register('unstakingValue')}
							placeholder="Amount of DAI to unstake"
							currentIsStake={currentIsStake}
						/>
						<StyledSubmit type="submit" value={'UNSTAKE'} />
					</StakingForm>
				)}
				<StyledYourBalances>
					<StyledStakingBalance>
						Your DAI Balance:{' '}
						<b>
							{window.web3.utils.fromWei(
								daiTokenBalance,
								'Ether',
							)}{' '}
							DAI
						</b>
					</StyledStakingBalance>
					<StyledRewardBalance>
						Your USI_Tk Balance:{' '}
						<b>
							{window.web3.utils.fromWei(
								usiTokenBalance,
								'Ether',
							)}{' '}
							USI_Tk
						</b>
					</StyledRewardBalance>
				</StyledYourBalances>
			</StyledBody>
		</StyledStaking>
	);
};

const StyledStaking = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 94vh;
	padding-left: 30px;
	padding-right: 30px;
	padding-top: 6vh;
`;

const StyledBody = styled.div`
	display: flex;
	flex-direction: column;
	width: 50vw;
	min-width: 500px;
`;

const StyledTitle = styled.div`
	padding-bottom: 50px;
	font-size: 30px;
	font-weight: bold;
	align-self: center;
`;

const StyledBalances = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 50px;
`;

const StyledStakingBalance = styled.div`
	border-top: 2px solid black;
	padding-right: 10px;
`;

const StyledRewardBalance = styled.div`
	border-top: 2px solid black;
	padding-left: 10px;
`;

const StyledSwitch = styled.div`
	display: grid;
	padding: 0px 35px;
	width: fit-content;
	height: min-content;
	border-top: 2px solid black;
	border-bottom: 2px solid black;
	transition: all 0.25s;
	&:hover {
		font-weight: 800;
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
`;

const StyledInnerSwitch = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const StyledStake = styled.div`
	font-weight: ${({ currentIsStake }) => (currentIsStake ? '800' : 'none')};
	color: ${({ currentIsStake }) =>
		currentIsStake ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0.6)'};
`;

const StyledArrow = styled.div`
	color: ${({ switchHover }) =>
		switchHover ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0.6)'};
	padding-left: 5px;
	padding-right: 5px;
`;

const StyledUnstake = styled.div`
	font-weight: ${({ currentIsStake }) => (currentIsStake ? 'none' : '800')};
	color: ${({ currentIsStake }) =>
		currentIsStake ? 'rgba(0, 0, 0, 0.6)' : 'rgb(0, 0, 0)'};
`;

const StyledYourBalances = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 50px;
`;

const StakingForm = styled.form`
	padding-top: 5px;
	display: flex;
	flex-direction: row;
`;

const StyledInput = styled.input`
	width: 50vw;
	font-size: 1.3em;
	padding-left: 10px;
	padding-right: 10px;
	border: ${({ currentIsStake }) =>
		currentIsStake
			? '2px solid rgba(0, 146, 0, 0.75)'
			: '2px solid rgba(146, 0, 0, 0.75)'};
`;

const StyledSubmit = styled.input`
	margin-left: 5px;
	align-self: left;
	width: fit-content;
	background: white;
	border: 2px solid black;
	border-radius: 25px;
	padding-left: 15px;
	padding-right: 15px;
	font-size: 1.3em;
	&:hover {
		font-weight: bold;
		text-decoration: none;
	}
`;

export default Staking;

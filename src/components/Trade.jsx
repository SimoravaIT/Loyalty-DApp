import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { items } from '../assets/items';

const Trade = ({
	account,
	usiTokenBalance,
	tokenFarm,
	usiToken,
	setUsiTokenBalance,
}) => {
	const [currentIsAll, setCurrentIsAll] = useState(true);
	const [switchHover, setSwitchHover] = useState(false);
	const [purchasedItems, setPurchasedItems] = useState([]);

	useEffect(() => {
		tokenFarm.methods
			.getItems(account)
			.call()
			.then(function(x) {
				setPurchasedItems(x);
			});
	}, []);

	const unpurchasedItems = useMemo(() => {
		return items.filter(
			(item) => !purchasedItems.includes(item.id.toString()),
		);
	}, [purchasedItems]);

	const onClickSwitch = () => {
		setCurrentIsAll((current) => !current);
	};

	const onSwitchHover = () => {
		setSwitchHover(true);
	};

	const onSwitchOut = () => {
		setSwitchHover(false);
	};

	const onSubmitPurchase = async ({ itemId, itemPrice }) => {
		if (usiTokenBalance >= itemPrice) {
			await usiToken.methods
				.approve(
					tokenFarm._address,
					window.web3.utils
						.toWei(itemPrice.toString(), 'Ether')
						.toString(),
				)
				.send({ from: account })
				.then(function() {
					if (purchasedItems.includes(itemId.toString())) {
						tokenFarm.methods
							.buyItem(
								window.web3.utils
									.toWei(itemPrice.toString(), 'Ether')
									.toString(),
							)
							.send({ from: account })
							.then(function() {
								usiToken.methods
									.balanceOf(account)
									.call()
									.then(function(x) {
										setUsiTokenBalance(x);
									});
							});
					} else {
						tokenFarm.methods
							.buyNewItem(
								itemId,
								window.web3.utils
									.toWei(itemPrice.toString(), 'Ether')
									.toString(),
							)
							.send({ from: account })
							.then(function() {
								usiToken.methods
									.balanceOf(account)
									.call()
									.then(function(x) {
										setUsiTokenBalance(x);
									});
							})
							.then(function() {
								tokenFarm.methods
									.getItems(account)
									.call()
									.then(function(x) {
										setPurchasedItems(x);
									});
							});
					}
				});
		} else {
			alert('Not enough USI_Tk');
		}
	};

	return (
		<StyledStaking>
			<StyledBody>
				<StyledTitle>Trade USI_Tk for exclusive items</StyledTitle>
				<StyledYourSituation>
					<StyledBalance>
						Your USI_Tk Balance:{' '}
						<b>
							{window.web3.utils.fromWei(
								usiTokenBalance,
								'Ether',
							)}{' '}
							USI_Tk
						</b>
					</StyledBalance>
					<StyledItemsGet>
						Obtained items:{' '}
						<b>
							{purchasedItems.length}/{items.length}
						</b>
					</StyledItemsGet>
				</StyledYourSituation>
				<StyledSwitch
					onClick={onClickSwitch}
					onMouseOver={onSwitchHover}
					onMouseOut={onSwitchOut}
				>
					<StyledInnerSwitch>
						<StyledStake currentIsAll={currentIsAll}>
							All
						</StyledStake>
						<StyledArrow switchHover={switchHover}>???</StyledArrow>
						<StyledUnstake currentIsAll={currentIsAll}>
							Not possessed
						</StyledUnstake>
					</StyledInnerSwitch>
				</StyledSwitch>
				{currentIsAll ? (
					<StyledPurchaseGrid>
						{items.map(({ name, id, price, img }) => (
							<StyledItem className={id}>
								<img
									src={img}
									height={165}
									width={165}
									alt="usi-logo"
								/>
								<StyledInfo>
									<StyledName>{name}</StyledName>
									<StyledPrice>Price: {price}</StyledPrice>
								</StyledInfo>
								<StyledPurchaseButton
									onClick={() =>
										onSubmitPurchase({
											itemId: id,
											itemPrice: price,
										})
									}
								>
									BUY
								</StyledPurchaseButton>
							</StyledItem>
						))}
					</StyledPurchaseGrid>
				) : (
					<StyledPurchaseGrid>
						{unpurchasedItems.map(({ name, id, price, img }) => (
							<StyledItem className={id}>
								<img
									src={img}
									height={165}
									width={165}
									alt="usi-logo"
								/>
								<StyledInfo>
									<StyledName>{name}</StyledName>
									<StyledPrice>Price: {price}</StyledPrice>
								</StyledInfo>
								<StyledPurchaseButton
									onClick={() =>
										onSubmitPurchase({
											itemName: name,
											itemId: id,
											itemPrice: price,
											itemImg: img,
										})
									}
								>
									BUY
								</StyledPurchaseButton>
							</StyledItem>
						))}
					</StyledPurchaseGrid>
				)}
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
	padding-bottom: 6vh;
`;

const StyledBody = styled.div`
	display: flex;
	flex-direction: column;
	width: 50vw;
	min-width: 750px;
`;

const StyledTitle = styled.div`
	padding-bottom: 50px;
	font-size: 30px;
	font-weight: bold;
	align-self: center;
`;

const StyledYourSituation = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 50px;
`;

const StyledBalance = styled.div`
	border-top: 2px solid black;
	padding-right: 10px;
`;

const StyledItemsGet = styled.div`
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
	font-weight: ${({ currentIsAll }) => (currentIsAll ? '800' : 'none')};
	color: ${({ currentIsAll }) =>
		currentIsAll ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0.6)'};
`;

const StyledArrow = styled.div`
	color: ${({ switchHover }) =>
		switchHover ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0.6)'};
	padding-left: 5px;
	padding-right: 5px;
`;

const StyledUnstake = styled.div`
	font-weight: ${({ currentIsAll }) => (currentIsAll ? 'none' : '800')};
	color: ${({ currentIsAll }) =>
		currentIsAll ? 'rgba(0, 0, 0, 0.6)' : 'rgb(0, 0, 0)'};
`;

const StyledPurchaseGrid = styled.div`
	margin-top: 10px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	justify-items: center;
	gap: 10px;
`;

const StyledItem = styled.div`
	padding: 10px;
	border: 2px solid ${({ color }) => color};
	display: flex;
	flex-direction: column;
	width: fit-content;
`;

const StyledInfo = styled.div`
	display: flex;
	padding-top: 20px;
	padding-bottom: 20px;
	flex-direction: row;
	justify-content: space-between;
`;

const StyledName = styled.div`
	border-top: 2px solid black;
	padding-right: 10px;
`;

const StyledPrice = styled.div`
	border-top: 2px solid black;
	padding-left: 10px;
`;

const StyledPurchaseButton = styled.div`
	align-self: center;
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
		cursor: pointer;
	}
`;

export default Trade;

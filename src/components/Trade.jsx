import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import USI_logo from '../usi-logo.png';

const Trade = ({ account, usiTokenBalance }) => {
	const [currentIsAll, setCurrentIsAll] = useState(true);
	const [switchHover, setSwitchHover] = useState(false);
	const [update, setUpdate] = useState(false);
	const [purchasedItems, setPurchasedItems] = useState([
		{
			name: 'Bag',
			id: 0,
			price: 50,
			img: USI_logo,
		},
		{
			name: 'T-shirt',
			id: 2,
			price: 50,
			img: USI_logo,
		},
	]);
	const [unpurchased, setUnpurchased] = useState([]);
	const [items, setItems] = useState([
		{
			name: 'Bag',
			id: 0,
			price: 50,
			img: USI_logo,
		},
		{
			name: 'Brooch',
			id: 1,
			price: 10,
			img: USI_logo,
		},
		{
			name: 'T-shirt',
			id: 2,
			price: 50,
			img: USI_logo,
		},
		{
			name: 'T-shirt',
			id: 3,
			price: 60,
			img: USI_logo,
		},
		{
			name: 'Thermos',
			id: 4,
			price: 50,
			img: USI_logo,
		},
		{
			name: 'Notebook',
			id: 5,
			price: 15,
			img: USI_logo,
		},
		{
			name: 'Keychain',
			id: 6,
			price: 5,
			img: USI_logo,
		},
	]);

	useEffect(() => {
		let newUnpurchased = [];
		for (let i = 0; i < items.length; i++) {
			let purchased = false;
			for (let j = 0; j < purchasedItems.length; j++) {
				if (purchasedItems[j].id === items[i].id) {
					purchased = true;
				}
			}
			if (!purchased) {
				newUnpurchased.push({
					name: items[i].name,
					id: items[i].id,
					price: items[i].price,
					img: items[i].img,
				});
			}
		}
		setUnpurchased(newUnpurchased);
	}, [update]);

	const onClickSwitch = () => {
		setCurrentIsAll(!currentIsAll);
	};

	const onSwitchHover = () => {
		setSwitchHover(true);
	};

	const onSwitchOut = () => {
		setSwitchHover(false);
	};

	const onSubmitPurchase = (data) => {
		const itemName = data.itemName;
		const itemId = data.itemId;
		const itemPrice = data.itemPrice;
		const itemImg = data.itemImg;

		// Check if it can be purchased and if so, do it

		// If the purchase has been successful:
		let newPurchasedItems = purchasedItems;
		for (let i = 0; i < purchasedItems.length; i++) {
			if (purchasedItems[i].id === itemId) {
				return;
			}
		}
		newPurchasedItems.push({
			name: itemName,
			id: itemId,
			price: itemPrice,
			img: itemImg,
		});
		setPurchasedItems(newPurchasedItems);
		setUpdate(!update);
		// Also, if successfull, update the list of purchased items of the user with newPurchasedItems
	};

	return (
		<StyledStaking>
			<StyledBody>
				<StyledTitle>Trade USIToken for exclusive items</StyledTitle>
				<StyledYourSituation>
					<StyledBalance>
						Your USIToken Balance: <b>{usiTokenBalance} USIToken</b>
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
						<StyledArrow switchHover={switchHover}>↔</StyledArrow>
						<StyledUnstake currentIsAll={currentIsAll}>
							Not possessed
						</StyledUnstake>
					</StyledInnerSwitch>
				</StyledSwitch>
				{currentIsAll ? (
					<StyledPurchaseGrid>
						{items.map(({ name, id, price, img }) => (
							<StyledItem>
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
				) : (
					<StyledPurchaseGrid>
						{unpurchased.map(({ name, id, price, img }) => (
							<StyledItem>
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
	min-width: 500px;
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

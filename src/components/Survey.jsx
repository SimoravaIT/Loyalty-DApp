import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Survey = ({
	account,
	usiTokenBalance,
	tokenFarm,
	usiToken,
	setUsiTokenBalance,
}) => {
	const { register, handleSubmit } = useForm();
	const [answers, setAnswers] = useState(null);

	useEffect(() => {
		tokenFarm.methods
			.getAnswers(account)
			.call()
			.then(function(x) {
				if (x.length === 0) {
					setAnswers(null);
				} else {
					setAnswers({ ds: x[0], fav: x[1], remarks: x[2] });
				}
			});
	}, []);

	const onSubmitStake = (data) => {
		if (answers !== null && answers !== []) {
			alert('You have already completed this survey once');
			return;
		}
		if (data.ds === '' || data.fav === '') {
			alert('Please answer all questions');
			return;
		}
		tokenFarm.methods
			.completeSurvey(data.ds, data.fav, data.remarks)
			.send({ from: account })
			.then(function() {
				tokenFarm.methods
					.getAsnwers(account)
					.call()
					.then(function(x) {
						setAnswers({ ds: x[0], fav: x[1], remarks: x[2] });
					});
			})
			.then(function() {
				usiToken.methods
					.balanceOf(account)
					.call()
					.then(function(x) {
						setUsiTokenBalance(x);
					});
			});
	};

	return (
		<StyledStaking>
			<StyledBody>
				<StyledTitle>Fill the Survey to receive USITokens</StyledTitle>
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
				</StyledYourSituation>
				<StakingForm onSubmit={handleSubmit(onSubmitStake)}>
					<StyledSelect {...register('ds')}>
						<option value="">
							Do you like Distributed Systems?
						</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</StyledSelect>
					<StyledSelect {...register('fav')}>
						<option value="">Your favorite course?</option>
						<option value="Distributed Systems">
							Distributed Systems
						</option>
						<option value="Not Distributed Systems">
							Not Distributed Systems
						</option>
					</StyledSelect>
					<StyledInput
						{...register('remarks')}
						placeholder="Any remark that you want to share?"
					/>
					<StyledSubmit type="submit" value={'Submit Answers'} />
				</StakingForm>
				{answers === null ? (
					<></>
				) : (
					<StyledAnswers>
						<StyledYourAnswers>Your Answers:</StyledYourAnswers>
						<StyledSingleAnswer>1: {answers.ds}</StyledSingleAnswer>
						<StyledSingleAnswer>
							2: {answers.fav}
						</StyledSingleAnswer>
						<StyledSingleAnswer>
							3: {answers.remarks}
						</StyledSingleAnswer>
					</StyledAnswers>
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
	margin-bottom: 25px;
`;

const StyledBalance = styled.div`
	border-top: 2px solid black;
	padding-right: 10px;
`;

const StakingForm = styled.form`
	padding-top: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledSelect = styled.select`
	width: 500px;
	font-size: 1.3em;
	margin-top: 10px;
`;

const StyledInput = styled.input`
	width: 500px;
	font-size: 1.3em;
	margin-top: 10px;
	padding-left: 10px;
	padding-right: 10px;
`;

const StyledSubmit = styled.input`
	align-self: left;
	width: fit-content;
	background: white;
	border: 2px solid black;
	border-radius: 25px;
	margin-top: 10px;
	padding-left: 15px;
	padding-right: 15px;
	font-size: 1.3em;
	&:hover {
		font-weight: bold;
		text-decoration: none;
	}
`;

const StyledAnswers = styled.div`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	width: fit-content;
`;

const StyledYourAnswers = styled.div`
	border-top: 2px solid black;
	padding-right: 25px;
	font-weight: bold;
`;

const StyledSingleAnswer = styled.div`
	word-break: break;
`;

export default Survey;

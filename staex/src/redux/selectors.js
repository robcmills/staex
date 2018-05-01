import { createSelector } from 'reselect'

import {
	ADJACENT_SQUARES_MAP,
	binaryToCartesianArray,
	TOKEN_TARGETS_MAP,
	WIN_SCORE,
} from './constants'
import { not, toString16 } from './helpers'

export const activePlayerSelector = ({ activePlayer }) => activePlayer

export const player1TokenSelector = ({ player1Token }) => player1Token
export const player2TokenSelector = ({ player2Token }) => player2Token

export const player1TokenStringSelector = createSelector(
	player1TokenSelector,
	player1Token => toString16(player1Token)
)
export const player2TokenStringSelector = createSelector(
	player2TokenSelector,
	player2Token => toString16(player2Token)
)

export const player1SquaresSelector = ({ player1Squares }) => player1Squares
export const player2SquaresSelector = ({ player2Squares }) => player2Squares

export const player1SquaresStringSelector = createSelector(
	player1SquaresSelector,
	player1Squares => toString16(player1Squares)
)
export const player2SquaresStringSelector = createSelector(
	player2SquaresSelector,
	player2Squares => toString16(player2Squares)
)

export const stackTargetsSelector = createSelector(
	activePlayerSelector,
	player1TokenSelector,
	player2TokenSelector,
	player1SquaresSelector,
	player2SquaresSelector,
	(activePlayer, player1Token, player2Token, player1Squares, player2Squares) => {
		const activePlayerToken = activePlayer === 1 ? player1Token : player2Token
		const activePlayerSquares = activePlayer === 1 ? player1Squares : player2Squares
		const adjacentSquares = ADJACENT_SQUARES_MAP[activePlayerToken]
		// Exclude squares already owned by player
		const ownedIntersection = adjacentSquares & activePlayerSquares
		let stackTargets = adjacentSquares ^ ownedIntersection
		// Exclude squares occupied by opponent
		const opponentToken = activePlayer === 1 ? player2Token : player1Token
		stackTargets = stackTargets & not(opponentToken)
		// Todo: exclude squares occluded by cliffs
		return stackTargets
	}
)

export const ownerSelector = createSelector(
	player1SquaresStringSelector,
	player2SquaresStringSelector,
	(state, { index }) => index,
	(player1SquaresString, player2SquaresString, index) => {
		if (player1SquaresString[index] === '1') {
			return 1
		}
		if (player2SquaresString[index] === '1') {
			return 2
		}
		return 0
	}
)

export const squareHeightsSelector = ({ squareHeights }) => squareHeights

export const heightSelector = createSelector(
	squareHeightsSelector,
	(state, { index }) => index,
	(heights, index) => heights[index]
)

export const tokensSelector = createSelector(
	player1TokenStringSelector,
	player2TokenStringSelector,
	(player1TokenString, player2TokenString) => [
		{ ...binaryToCartesianArray[player1TokenString.indexOf('1')], owner: 1 },
		{ ...binaryToCartesianArray[player2TokenString.indexOf('1')], owner: 2 },
	]
)

export const tokenTargetsSelector = createSelector(
	activePlayerSelector,
	player1TokenSelector,
	player2TokenSelector,
	(activePlayer, player1Token, player2Token) => {
		const activePlayerToken = activePlayer === 1 ? player1Token : player2Token
		let tokenTargets = TOKEN_TARGETS_MAP[activePlayerToken]
		// Exclude squares occupied by opponent token
		const opponentToken = activePlayer === 1 ? player2Token : player1Token
		tokenTargets = tokenTargets & not(opponentToken)
		// Todo: exclude targets occluded by cliffs
		return tokenTargets
	}
)

export const tokenTargetsArraySelector = createSelector(
	tokenTargetsSelector,
	activePlayerSelector,
	(tokenTargets, activePlayer) => {
		const tokenTargetsString = toString16(tokenTargets)
		return binaryToCartesianArray
			.map((target, index) => ({ ...target, index, owner: activePlayer }))
			.filter((coord, index) => tokenTargetsString[index] === '1')
	}
)

export const player1ScoreSelector = createSelector(
	player1SquaresStringSelector,
	squareHeightsSelector,
	(player1SquaresString, heights) => heights.reduce((acc, height, index) =>
		player1SquaresString[index] === '1' ? acc + heights[index] : acc, 0)
)

export const player2ScoreSelector = createSelector(
	player2SquaresStringSelector,
	squareHeightsSelector,
	(player2SquaresString, heights) => heights.reduce((acc, height, index) =>
		player2SquaresString[index] === '1' ? acc + heights[index] : acc, 0)
)

export const possibleMovesSelector = createSelector(
	stackTargetsSelector,
	tokenTargetsSelector,
	(stackTargets, tokenTargets) => [
		...toString16(stackTargets)
			.split('')
			.map((value, index) => ({ type: 'STACK', index, value }))
			.filter(({ value }) => value === '1'),
		...toString16(tokenTargets)
			.split('')
			.map((value, index) => ({ type: 'MOVE', index, value }))
			.filter(({ value }) => value === '1'),
	].map(({ type, index }) => ({ type, payload: { index } })),
)

export const winnerSelector = createSelector(
	player1ScoreSelector,
	player2ScoreSelector,
	(player1Score, player2Score) => {
		if (player1Score > WIN_SCORE) {
			return 1
		}
		if (player2Score > WIN_SCORE) {
			return 2
		}
		return 0
	}
)
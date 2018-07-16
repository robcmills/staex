const { createSelector } = require('reselect')

const {
	binaryToCartesianArray,
	TOKEN_TARGETS_MAP,
	WIN_SCORE,
} = require('./constants')
const { not, toString16 } = require('./helpers')

const activePlayerSelector = ({ activePlayer }) => activePlayer

const player1TokenSelector = ({ player1Token }) => player1Token
const player2TokenSelector = ({ player2Token }) => player2Token

const player1TokenStringSelector = createSelector(
	player1TokenSelector,
	player1Token => toString16(player1Token)
)
const player2TokenStringSelector = createSelector(
	player2TokenSelector,
	player2Token => toString16(player2Token)
)

const player1SquaresSelector = ({ player1Squares }) => player1Squares
const player2SquaresSelector = ({ player2Squares }) => player2Squares

const player1SquaresStringSelector = createSelector(
	player1SquaresSelector,
	player1Squares => toString16(player1Squares)
)
const player2SquaresStringSelector = createSelector(
	player2SquaresSelector,
	player2Squares => toString16(player2Squares)
)

const squareHeightsSelector = ({ squareHeights }) => squareHeights

const boardSizeSelector = createSelector(
	squareHeightsSelector,
	squareHeights => Math.floor(Math.sqrt(squareHeights.length))
)

const powerMapSelector = createSelector(
	squareHeightsSelector,
	squareHeights => {
		const powerMap = {}
		for (let i = 0; i < squareHeights.length; i++) {
			powerMap[i] = Math.pow(2, i)
		}
		return powerMap
	}
)

function isValidCoord({ x, y, boardSize }) {
	if (x < 0 || x >= boardSize) {
		return false;
	}
	if (y < 0 || y >= boardSize) {
		return false;
	}
	return true;
}

const adjacentSquaresMapSelector = createSelector(
	boardSizeSelector,
	powerMapSelector,
	(boardSize, powerMap) => {
		const length = boardSize * boardSize
		const adjacentsMap = {}
		const adjacents = [ [-1,0], [1,0], [0,0], [0,1], [0,-1] ]
		let lengthMask = 1
		for (let i = 0; i < length; i++) {
			lengthMask |= powerMap[i]
		}
		for (let i = 0; i < length; i++) {
			const targetY = Math.floor((length - 1 - i) / boardSize)
			const targetX = (length - 1 - i) % boardSize
			let adjacentSquares = 0
			for (let a = 0; a < 5; a++) {
				const x = adjacents[a][0] + targetX
				const y = adjacents[a][1] + targetY
				if (isValidCoord({ x, y, boardSize })) {
					adjacentSquares |= powerMap[x + y * boardSize]
				}
			}
			const key = powerMap[length - i - 1]
			const value = adjacentSquares & lengthMask
			adjacentsMap[key] = value
		}
		return adjacentsMap;
	}
)

const stackTargetsSelector = createSelector(
	activePlayerSelector,
	player1TokenSelector,
	player2TokenSelector,
	player1SquaresSelector,
	player2SquaresSelector,
	adjacentSquaresMapSelector,
	(
		activePlayer,
		player1Token,
		player2Token,
		player1Squares,
		player2Squares,
		adjacentSquaresMap
	) => {
		const activePlayerToken = activePlayer === 1 ? player1Token : player2Token
		const activePlayerSquares = activePlayer === 1 ? player1Squares : player2Squares
		const adjacentSquares = adjacentSquaresMap[activePlayerToken]
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

const ownerSelector = createSelector(
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

const heightSelector = createSelector(
	squareHeightsSelector,
	(state, { index }) => index,
	(heights, index) => heights[index]
)

const tokensSelector = createSelector(
	player1TokenStringSelector,
	player2TokenStringSelector,
	(player1TokenString, player2TokenString) => [
		{ ...binaryToCartesianArray[player1TokenString.indexOf('1')], owner: 1 },
		{ ...binaryToCartesianArray[player2TokenString.indexOf('1')], owner: 2 },
	]
)

const tokenTargetsSelector = createSelector(
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

const tokenTargetsArraySelector = createSelector(
	tokenTargetsSelector,
	activePlayerSelector,
	(tokenTargets, activePlayer) => {
		const tokenTargetsString = toString16(tokenTargets)
		return binaryToCartesianArray
			.map((target, index) => ({ ...target, index, owner: activePlayer }))
			.filter((coord, index) => tokenTargetsString[index] === '1')
	}
)

const player1ScoreSelector = createSelector(
	player1SquaresStringSelector,
	squareHeightsSelector,
	(player1SquaresString, heights) => heights.reduce((acc, height, index) =>
		player1SquaresString[index] === '1' ? acc + heights[index] : acc, 0)
)

const player2ScoreSelector = createSelector(
	player2SquaresStringSelector,
	squareHeightsSelector,
	(player2SquaresString, heights) => heights.reduce((acc, height, index) =>
		player2SquaresString[index] === '1' ? acc + heights[index] : acc, 0)
)

const possibleMovesSelector = createSelector(
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

const winnerSelector = createSelector(
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

const isRuntimeInitializedSelector = ({ isRuntimeInitialized }) => isRuntimeInitialized

module.exports = {
	activePlayerSelector,
	adjacentSquaresMapSelector,
	boardSizeSelector,
	heightSelector,
	isRuntimeInitializedSelector,
	ownerSelector,
	player1ScoreSelector,
	player1SquaresSelector,
	player1SquaresStringSelector,
	player1TokenSelector,
	player1TokenStringSelector,
	player2ScoreSelector,
	player2SquaresSelector,
	player2SquaresStringSelector,
	player2TokenSelector,
	player2TokenStringSelector,
	possibleMovesSelector,
	squareHeightsSelector,
	stackTargetsSelector,
	tokensSelector,
	tokenTargetsArraySelector,
	tokenTargetsSelector,
	winnerSelector,
}
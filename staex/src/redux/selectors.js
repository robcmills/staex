// import _ from 'lodash'
import { createSelector } from 'reselect'

import { ADJACENT_SQUARES_MAP } from './constants'
import { not, toString16 } from './helpers'

export const activePlayerSelector = ({ activePlayer }) => activePlayer

export const player1TokenSelector = ({ player1Token }) => player1Token
export const player2TokenSelector = ({ player2Token }) => player2Token

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
		const stackTargets = adjacentSquares ^ ownedIntersection
		return stackTargets
	}
)

export const squaresSelector = createSelector(
	stackTargetsSelector,
	stackTargets => not(stackTargets)
)

export const ownerSelector = createSelector(
	player1SquaresStringSelector,
	player2SquaresStringSelector,
	(state, { binaryIndex }) => binaryIndex,
	(player1SquaresString, player2SquaresString, binaryIndex) => {
		if (player1SquaresString[binaryIndex] === '1') {
			return 1
		}
		if (player2SquaresString[binaryIndex] === '1') {
			return 2
		}
		return 0
	}
)

export const squareHeightsSelector = ({ squareHeights }) => squareHeights

export const heightSelector = createSelector(
	squareHeightsSelector,
	(state, { binaryIndex }) => binaryIndex,
	(heights, binaryIndex) => heights[binaryIndex]
)


// import getAdjacentSquares from './get-adjacent-squares'

// export const activeActionSelector = ({ activeAction }) => activeAction
// export const boardSelector = ({ board }) => board

// export const tokensSelector = createSelector(
// 	boardSelector,
// 	board =>
// 		_.reduce(
// 			board,
// 			(acc, { tokens }, key) => {
// 				if(tokens) {
// 					acc.push({ location: key, tokens })
// 				}
// 				return acc
// 			}, [])
// )

// export const activePlayerTokensSelector = createSelector(
// 	activePlayerSelector,
// 	tokensSelector,
// 	(activePlayer, tokens) => {
// 		return tokens.filter(
// 			token => (token.tokens || []).includes(activePlayer))
// 	}
// )

// export const squareStateFromPropsSelector = (state, { squareState }) => squareState

// export const squareStateSelector = createSelector(
// 	boardSelector,
// 	(state, { file, rank }) => ({ file, rank }),
// 	(board, { file, rank }) => board[`${file}:${rank}`]
// )

// export const isValidStackTargetSelector = createSelector(
// 	activeActionSelector,
// 	activePlayerSelector,
// 	activePlayerTokensSelector,
// 	boardSelector,
// 	squareStateSelector,
// 	(state, { rank, file }) => ({ rank, file }),
// 	(
// 		activeAction,
// 		activePlayer,
// 		activePlayerTokens,
// 		board,
// 		squareState,
// 		{ rank, file },
// 	) => {
// 		if (activeAction !== 'stack') {
// 			return false
// 		}

// 		// Square must not be owned by active player
// 		if (
// 			squareState &&
// 			squareState.owner &&
// 			squareState.owner === activePlayer
// 		) {

// 			return false
// 		}

// 		// Square must not be occupied by opponent tokens
// 		const hasTokens = squareState &&
// 			squareState.tokens &&
// 			squareState.tokens.length > 0
// 		if (
// 			hasTokens &&
// 			squareState.tokens.some(owner => owner !== activePlayer)
// 		) {
// 			return false
// 		}

// 		// If active player has a token on the square, can stack
// 		if (
// 			hasTokens && squareState.tokens.includes(activePlayer)
// 		) {
// 			return true
// 		}

// 		// If square is adjacent to active player token,
// 		// and not up a cliff, can stack
// 		const adjacentSquares = getAdjacentSquares({ board, rank, file })
// 		return adjacentSquares.some(({ height, tokens }) => {
// 			const thisHeight = squareState.height || 0
// 			if ((thisHeight - height) > 1) {
// 				return false
// 			}
// 			return tokens.length && tokens.includes(activePlayer)
// 		})
// 	}
// )

// export const isValidTokenMoveTargetSelector = createSelector(
// 	activePlayerSelector,
// 	activePlayerTokensSelector,
// 	squareStateSelector,
// 	(state, { rank, file }) => ({ rank, file }),
// 	(
// 		activePlayer,
// 		activePlayerTokens,
// 		squareState,
// 		{ rank, file },
// 	) => {
// 		// Square must not be occupied by opponent tokens
// 		const hasTokens = squareState &&
// 			squareState.tokens &&
// 			squareState.tokens.length > 0
// 		if (
// 			hasTokens &&
// 			squareState.tokens.some(owner => owner !== activePlayer)
// 		) {
// 			return false
// 		}

// 		// Square is on same rank or file as active player token
// 		return activePlayerTokens.some(token => {
// 			const [x, y] = token.location.split(':')
// 			if (x === `${file}` && y === `${rank}`) {
// 				return false
// 			}
// 			return (x === `${file}`) || (y === `${rank}`)
// 		})
// 	}
// )

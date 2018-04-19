// import _ from 'lodash'
import { createSelector } from 'reselect'

import { ADJACENT_SQUARES_MAP } from './constants'

export const activePlayerSelector = ({ activePlayer }) => activePlayer

export const player1TokenSelector = ({ player1Token }) => player1Token
export const player2TokenSelector = ({ player2Token }) => player2Token

export const stackTargetsMaskSelector = createSelector(
	activePlayerSelector,
	player1TokenSelector,
	player2TokenSelector,
	(activePlayer, player1Token, player2Token) => {
		const activePlayerToken = activePlayer === 1 ? player1Token : player2Token
		console.log('activePlayerToken', activePlayerToken)
		const adjacentSquares = ADJACENT_SQUARES_MAP[activePlayerToken]
		console.log('adjacentSquares', adjacentSquares.toString(2))
		return ''
	}
)

export const foundationSquaresSelector = createSelector(
	stackTargetsMaskSelector,
	stackTargetsMask => {
		console.log('stackTargetsMask', stackTargetsMask.toString(2))
	}
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

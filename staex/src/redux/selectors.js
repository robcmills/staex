import _ from 'lodash'
import { createSelector } from 'reselect'

import getAdjacentSquares from './get-adjacent-squares'

export const activeActionSelector = ({ activeAction }) => activeAction
export const activePlayerSelector = ({ activePlayer }) => activePlayer
export const boardSelector = ({ board }) => board

export const tokensSelector = createSelector(
	boardSelector,
	board =>
		_.reduce(
			board,
			(acc, { tokens }, key) => {
				if(tokens) {
					acc.push({ location: key, tokens })
				}
				return acc
			}, [])
)

export const activePlayerTokensSelector = createSelector(
	activePlayerSelector,
	tokensSelector,
	(activePlayer, tokens) => tokens.filter(
		({ tokens }) => (tokens || []).includes(activePlayer))
)

export const squareStateFromPropsSelector = (state, { squareState }) => squareState

export const squareStateSelector = createSelector(
	boardSelector,
	(state, { file, rank }) => ({ file, rank }),
	(board, { file, rank }) => board[`${file}:${rank}`]
)

export const isValidStackTargetSelector = createSelector(
	activeActionSelector,
	activePlayerSelector,
	activePlayerTokensSelector,
	boardSelector,
	squareStateSelector,
	(state, { rank, file }) => ({ rank, file }),
	(
		activeAction,
		activePlayer,
		activePlayerTokens,
		board,
		squareState,
		{ rank, file },
	) => {
		if (activeAction !== 'stack') {
			return false
		}

		// Square must not be owned by active player
		if (
			squareState &&
			squareState.owner &&
			squareState.owner === activePlayer
		) {

			return false
		}

		// Square must not be occupied by opponent tokens
		const hasTokens = squareState &&
			squareState.tokens &&
			squareState.tokens.length > 0
		if (
			hasTokens &&
			squareState.tokens.some(owner => owner !== activePlayer)
		) {
			return false
		}

		// If active player has a token on the square, can stack
		if (
			hasTokens && squareState.tokens.includes(activePlayer)
		) {
			return true
		}

		// If square is adjacent to active player token,
		// and not up a cliff, can stack
		const adjacentSquares = getAdjacentSquares({ board, rank, file })
		return adjacentSquares.some(({ height, tokens }) => {
			const thisHeight = squareState.height || 0
			if ((height - thisHeight) > 1) {
				return false
			}
			return tokens && tokens.includes(activePlayer)
		})
	}
)
import _ from 'lodash'
import { createSelector } from 'reselect'

import { playerColors } from './constants'

export const activeActionSelector = ({ activeAction }) => activeAction
export const activePlayerSelector = ({ activePlayer }) => activePlayer
export const boardSelector = ({ board }) => board

export const tokensSelector = createSelector(
	boardSelector,
	board =>
		_.reduce(
			board,
			(acc, { token }, key) => {
				if(token) {
					acc.push({ location: key, color: token })
				}
				return acc
			}, [])
)

export const activePlayerTokensSelector = createSelector(
	activePlayerSelector,
	tokensSelector,
	(activePlayer, tokens) => tokens.filter(
		({ color }) => color === playerColors[activePlayer].tokenColor))

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
	squareStateFromPropsSelector,
	(activeAction, activePlayer, activePlayerTokens, squareState) => {
		console.log('activeAction', activeAction)
		console.log('activePlayer', activePlayer)
		console.log('activePlayerTokens', activePlayerTokens)
		console.log('squareState', squareState)
		return false
	}
)
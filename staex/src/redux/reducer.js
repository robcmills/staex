import createReducer from './create-reducer'
import { activePlayerTokensSelector } from './selectors'

const initialState = {
	activePlayer: 1,
	activeAction: 'stack',
	board: {
		'0:0': { owner: 1, height: 1, tokens: [1] },
		'1:0': { owner: null, height: 0, tokens: [] },
		'2:0': { owner: null, height: 0, tokens: [] },
		'3:0': { owner: null, height: 0, tokens: [] },
		'0:1': { owner: null, height: 0, tokens: [] },
		'1:1': { owner: null, height: 0, tokens: [] },
		'2:1': { owner: null, height: 0, tokens: [] },
		'3:1': { owner: null, height: 0, tokens: [] },
		'0:2': { owner: null, height: 0, tokens: [] },
		'1:2': { owner: null, height: 0, tokens: [] },
		'2:2': { owner: null, height: 0, tokens: [] },
		'3:2': { owner: null, height: 0, tokens: [] },
		'0:3': { owner: null, height: 0, tokens: [] },
		'1:3': { owner: null, height: 0, tokens: [] },
		'2:3': { owner: null, height: 0, tokens: [] },
		'3:3': { owner: 2, height: 1, tokens: [2] },
	},
}

export default createReducer(initialState, {
	STACK: (state, { rank, file }) => {
		const key = `${file}:${rank}`
		return {
			...state,
			activePlayer: state.activePlayer === 1 ? 2 : 1,
			board: {
				...state.board,
				[key]: {
					...state.board[key],
					owner: state.activePlayer,
					height: (state.board[key].height || 0) + 1
				},
			},
		}
	},
	MOVE: (state, { rank, file }) => {
		const key = `${file}:${rank}`
		const activePlayerTokens = activePlayerTokensSelector(state)
		const activePlayerToken = activePlayerTokens[0]
		return {
			...state,
			activePlayer: state.activePlayer === 1 ? 2 : 1,
			board: {
				...state.board,
				[key]: {
					...state.board[key],
					tokens: state.board[key].tokens
						.concat(state.activePlayer),
				},
				[activePlayerToken.location]: {
					...state.board[activePlayerToken.location],
					tokens: state.board[key].tokens
						.filter(token => token !== state.activePlayer),
				},
			},
		}
	},
})

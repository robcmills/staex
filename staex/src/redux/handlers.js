const { not } = require('./helpers')

module.exports = {
	STACK: (state, { index }) => {
		const length = state.squareHeights.length
		const activePlayer = state.activePlayer
		const activePlayerKey = `player${activePlayer}Squares`
		const mask = Math.pow(2, length - index - 1)
		const activePlayerSquares = state[activePlayerKey] | mask

		const inactivePlayerKey = `player${activePlayer === 1 ? 2 : 1}Squares`
		const unmask = not(mask)
		const inactivePlayerSquares = state[inactivePlayerKey] & unmask
		return {
			...state,
			activePlayer: state.activePlayer === 1 ? 2 : 1,
			[activePlayerKey]: activePlayerSquares,
			[inactivePlayerKey]: inactivePlayerSquares,
			squareHeights: [
				...state.squareHeights.slice(0, index),
				state.squareHeights[index] + 1,
				...state.squareHeights.slice(index + 1, state.squareHeights.length),
			],
		}
	},
	MOVE: (state, { index }) => {
		const length = state.squareHeights.length
		const activePlayer = state.activePlayer
		const key = `player${activePlayer}Token`
		const val = Math.pow(2, length - index - 1)
		return {
			...state,
			activePlayer: state.activePlayer === 1 ? 2 : 1,
			[key]: val,
		}
	},
	ON_RUNTIME_INITIALIZED: state => {
		return {
			...state,
			isRuntimeInitialized: true,
		}
	}
}

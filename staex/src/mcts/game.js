const {
	possibleMovesSelector,
	winnerSelector,
} = require('../redux/selectors')
const handlers = require('../redux/handlers')

module.exports = class Game {
	constructor({ initialState }) {
		this.state = initialState
	}

	getPossibleMoves() {
		return possibleMovesSelector(this.state)
	}

	performMove({ type, payload }) {
		this.state = handlers[type](this.state, payload)
	}

	getCurrentPlayer() {
		return this.state.activePlayer
	}

	getWinner() {
		return winnerSelector(this.state)
	}
}
import {
	possibleMovesSelector,
	winnerSelector,
} from '../redux/selectors'
import handlers from '../redux/handlers'

export default class Game {
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
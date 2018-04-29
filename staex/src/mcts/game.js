import {
	possibleMovesSelector,
	player1ScoreSelector,
	player2ScoreSelector,
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
		if (player1ScoreSelector(this.state) > 10) {
			return 1
		}
		if (player2ScoreSelector(this.state) > 10) {
			return 2
		}
		return 0
	}
}
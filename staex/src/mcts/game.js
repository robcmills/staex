import {
	possibleMovesSelector,
} from '../redux/selectors'

export default class Game {
	constructor(initialState) {
		this.state = initialState
	}

	getPossibleMoves() {
		return possibleMovesSelector(this.state)
	}

	performMove(move) {
		// updates the internal state of the game based on the move
	}

	getCurrentPlayer() {
		return this.state.activePlayer
	}

	getWinner() {
		return 0
	}
}
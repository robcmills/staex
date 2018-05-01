import _ from 'lodash'
import Game from './game'

function getRandom(length) {
	return Math.floor(Math.random() * length)
}

// Exploration parameter
const C = 2

class Node {
	constructor({ depth, game, move, parent }) {
		this.children = []
		this.depth = depth || 0
		this.game = game
		this.move = move
		this.parent = parent
		this.simulations = 0
		this.wins = 0
		this.setUCB()
	}

	inspect(depth = 1) {
		console.log(
			'move', _.get(this, 'move.type'), _.get(this, 'move.payload.index'),
			'depth', this.depth,
			'simulations', this.simulations,
			'wins', this.wins,
			'ucb', this.ucb,
		)
		if (this.depth < depth && this.children.length) {
			this.children.map(child => child.inspect())
		}
	}

	addChildren() {
		this.children = this.game.getPossibleMoves().map(childMove => {
			const childGame = new Game({ initialState: this.game.state })
			childGame.performMove(childMove)
			return new Node({
				depth: this.depth + 1,
				move: childMove,
				game: childGame,
				parent: this,
			})
		})
	}

	setUCB() {
		if (this.simulations === 0) {
			this.ucb = Infinity
			return
		}
		if (!this.parent || this.parent.simulations === 0) {
			this.ucb = 0
			return
		}
		const exploitation = this.wins / this.simulations
		const exploration = Math.sqrt(C * Math.log(this.parent.simulations) / this.simulations)
		this.ucb = exploitation + exploration
	}
}

class MCTS {
	constructor({ game, rounds, timeout }) {
		this.rounds = rounds || 1000
		this.timeout = timeout || 1000
		this.rootNode = new Node({ game })
		this.currentNode = this.rootNode
		this.currentNode.addChildren()
	}

	shouldContinue() {
		if (!this.start) {
			this.start = new Date()
		}
		if (new Date() - this.start > this.timeout) {
			console.log('timed out')
			return false
		}
		return this.rounds > 0
	}

	select() {
		// console.log('select')
		// Traverse the tree from root to leaf
		// Use UCB to select a child nodes
		this.currentNode = this.rootNode
		while (this.currentNode.children.length && this.shouldContinue()) {
			const selectedNode = _(this.currentNode.children)
				.shuffle()
				.sortBy('ucb')
				.last()
			// console.log('selectedNode', selectedNode.inspect())
			this.currentNode = selectedNode
		}
	}

	expand() {
		// console.log('expand')
		this.winner = this.currentNode.game.getWinner()
		if (this.winner) return
		this.currentNode.addChildren()
		this.currentNode = this.currentNode.children[
			getRandom(this.currentNode.children.length)
		]
	}

	playout() {
		// console.log('playout')
		// let playoutCount = 0
		const playoutGame = new Game({ initialState: this.currentNode.game.state })
		while (!playoutGame.getWinner() && this.shouldContinue()) {
			const moves = playoutGame.getPossibleMoves()
			const selectedMove = moves[getRandom(moves.length)]
			playoutGame.performMove(selectedMove)
			// playoutCount += 1
		}
		// console.log('playout took ', playoutCount, ' moves')
		this.winner = playoutGame.getWinner()
		// console.log('winner', this.winner)
	}

	propagate() {
		// console.log('propagate')
		while (this.currentNode && this.shouldContinue()) {
			this.currentNode.simulations++
			if (this.currentNode.game.state.activePlayer !== this.winner) {
				this.currentNode.wins++
			}
			this.currentNode.setUCB()
			this.currentNode = this.currentNode.parent
		}
	}

	getMove() {
		while (this.shouldContinue()) {
			this.select()
			this.expand()
			if (!this.winner) this.playout()
			this.propagate()
			this.rounds -= 1
		}
		// this.inspect()
		return _(this.rootNode.children).sortBy('simulations').last().move
	}

	inspect() {
		this.rootNode.inspect()
	}
}

export default MCTS

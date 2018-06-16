const Game = require('./game')
const MCTS = require('.')
const initialState = require('../redux/initial-state')

const testSelectMove = () => {
	const game = new Game({ initialState })
	const mcts = new MCTS({ game, rounds: 1000, timeout: 10000 })
	const start = new Date()
	const move = mcts.getMove()
	console.log('move', move)
	const end = new Date()
	const elapsed = end - start
	console.log('elapsed', elapsed, 'ms')
}

testSelectMove()

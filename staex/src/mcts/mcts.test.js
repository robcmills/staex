import Game from './game'
import MCTS from '.'
import initialState from '../redux/initial-state'

fit('selectMove', () => {
	const game = new Game({ initialState })
	const mcts = new MCTS({ game, rounds: 100000, timeout: 110000 })
	const start = new Date()
	const move = mcts.getMove()
	const end = new Date()
	const elapsed = end - start
	console.log('elapsed', elapsed, 'ms')
})

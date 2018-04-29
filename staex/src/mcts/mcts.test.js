import Game from './game'
import MCTS from '.'
import initialState from '../redux/initial-state'

fit('selectMove', () => {
	const game = new Game({ initialState })
	const mcts = new MCTS({ game, rounds: 500 })
	const move = mcts.getMove()
	console.log('move', move)
})

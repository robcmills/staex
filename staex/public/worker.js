/* eslint-disable no-undef */
onmessage = function(event) {
	console.log('Message received from main', event.data)
	// var Game = event.data.Game
	// var MCTS = event.data.MCTS
	// var state = event.data.state

	// var game = new Game({ initialState: state })
	// var mcts = new MCTS({ game, rounds: 1000, timeout: 1000 })
	// var move = mcts.getMove()
	postMessage('move')
}
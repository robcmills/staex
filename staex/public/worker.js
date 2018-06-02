/* eslint-disable no-undef */
importScripts('staex.em.js')

const BOARD_SIZE = 4

function convertGameStateToArgs({
	player1Squares,
	player2Squares,
	player1Token,
	player2Token,
	squareHeights,
}) {
	return [
		BOARD_SIZE,
		player1Squares,
		player2Squares,
		player1Token,
		player2Token,
		squareHeights,
	]
}

onmessage = function(event) {
	console.log('worker onmessage event.data (js):', event.data)
	const args = convertGameStateToArgs(event.data)
	const result = Module.compute_move(...args)
	postMessage(result)
}

onerror = function(error) {
	console.error('Worker error:', e.message)
}
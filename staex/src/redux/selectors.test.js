const _ = require('lodash')
const { adjacentSquaresMapSelector, movesMapSelector } = require('./selectors')
const { ADJACENT_SQUARES_MAP, TOKEN_TARGETS_MAP } = require('./constants')

const fakeState = {
	squareHeights: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
}

function testAdjacentSquaresMap() {
	const adjacentSquaresMap = adjacentSquaresMapSelector(fakeState)
	if (!_.isEqual(adjacentSquaresMap, ADJACENT_SQUARES_MAP)) {
		console.error('adjacentSquaresMap is incorrect')
	}
}

function testMovesMap() {
	const movesMap = movesMapSelector(fakeState)
	if (!_.isEqual(movesMap, TOKEN_TARGETS_MAP)) {
		console.error('movesMap is incorrect')
	}
}

function test() {
	testAdjacentSquaresMap()
	testMovesMap()
	console.log('Tests complete')
}

test()

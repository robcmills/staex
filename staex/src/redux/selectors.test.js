const _ = require('lodash')
const { adjacentSquaresMapSelector } = require('./selectors')
const initialState = require('./initial-state')
const { ADJACENT_SQUARES_MAP } = require('./constants')

function testAdjacentSquaresMap() {
	const adjacentSquaresMap = adjacentSquaresMapSelector(initialState)
	if (!_.isEqual(adjacentSquaresMap, ADJACENT_SQUARES_MAP)) {
		console.error('adjacentSquaresMap is incorrect')
	}
}

function test() {
	testAdjacentSquaresMap()
	console.log('Tests complete')
}

test()
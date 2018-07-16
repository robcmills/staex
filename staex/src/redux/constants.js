const { bitBoard } = require('./helpers')
const b = bitBoard

const WIN_SCORE = 10

const ADJACENT_SQUARES_MAP = {
	[b('1000 0000 0000 0000')]: b('1100 1000 0000 0000'),
	[b('0100 0000 0000 0000')]: b('1110 0100 0000 0000'),
	[b('0010 0000 0000 0000')]: b('0111 0010 0000 0000'),
	[b('0001 0000 0000 0000')]: b('0011 0001 0000 0000'),
	[b('0000 1000 0000 0000')]: b('1000 1100 1000 0000'),
	[b('0000 0100 0000 0000')]: b('0100 1110 0100 0000'),
	[b('0000 0010 0000 0000')]: b('0010 0111 0010 0000'),
	[b('0000 0001 0000 0000')]: b('0001 0011 0001 0000'),
	[b('0000 0000 1000 0000')]: b('0000 1000 1100 1000'),
	[b('0000 0000 0100 0000')]: b('0000 0100 1110 0100'),
	[b('0000 0000 0010 0000')]: b('0000 0010 0111 0010'),
	[b('0000 0000 0001 0000')]: b('0000 0001 0011 0001'),
	[b('0000 0000 0000 1000')]: b('0000 0000 1000 1100'),
	[b('0000 0000 0000 0100')]: b('0000 0000 0100 1110'),
	[b('0000 0000 0000 0010')]: b('0000 0000 0010 0111'),
	[b('0000 0000 0000 0001')]: b('0000 0000 0001 0011'),
}

const TOKEN_TARGETS_MAP = {
	[b('1000 0000 0000 0000')]: b('0111 1000 1000 1000'),
	[b('0100 0000 0000 0000')]: b('1011 0100 0100 0100'),
	[b('0010 0000 0000 0000')]: b('1101 0010 0010 0010'),
	[b('0001 0000 0000 0000')]: b('1110 0001 0001 0001'),
	[b('0000 1000 0000 0000')]: b('1000 0111 1000 1000'),
	[b('0000 0100 0000 0000')]: b('0100 1011 0100 0100'),
	[b('0000 0010 0000 0000')]: b('0010 1101 0010 0010'),
	[b('0000 0001 0000 0000')]: b('0001 1110 0001 0001'),
	[b('0000 0000 1000 0000')]: b('1000 1000 0111 1000'),
	[b('0000 0000 0100 0000')]: b('0100 0100 1011 0100'),
	[b('0000 0000 0010 0000')]: b('0010 0010 1101 0010'),
	[b('0000 0000 0001 0000')]: b('0001 0001 1110 0001'),
	[b('0000 0000 0000 1000')]: b('1000 1000 1000 0111'),
	[b('0000 0000 0000 0100')]: b('0100 0100 0100 1011'),
	[b('0000 0000 0000 0010')]: b('0010 0010 0010 1101'),
	[b('0000 0000 0000 0001')]: b('0001 0001 0001 1110'),
}

const playerColors = {
	1: {
		tokenFill: '#f49100',
		tokenBorder: '2px solid black',
		square: 'burlywood',
	},
	2: {
		tokenFill: '#ad7bfb',
		tokenBorder: '2px solid black',
		square: 'darkseagreen',
	},
}

const binaryToCartesianArray = [
	{x:0,y:3},{x:1,y:3},{x:2,y:3},{x:3,y:3},
	{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2},
	{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:3,y:1},
	{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},
]

module.exports = {
	WIN_SCORE,
	ADJACENT_SQUARES_MAP,
	binaryToCartesianArray,
	TOKEN_TARGETS_MAP,
	playerColors,
}
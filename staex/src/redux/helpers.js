const bitBoard = binaryString =>
	parseInt(binaryString.replace(/\s/g, ''), 2)

const not = int => ~int >>> 0

const binaryToString = (int, width) => int.toString(2).padStart(width, 0)

/*
2 | 0 1 2
1 | 3 4 5
0 | 6 7 8
y  ------
  x 0 1 2
*/
const indexToCoord = ({ boardSize, index }) => {
	const length = boardSize * boardSize
	const y = Math.floor((length - 1 - index) / boardSize)
	const x = index % boardSize
	return { x, y }
}

module.exports = {
	binaryToString,
	bitBoard,
	indexToCoord,
	not,
}
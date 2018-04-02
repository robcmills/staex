export default function getAdjacentSquares({ board, rank , file }) {
	return [
		`${file}:${rank + 1}`,
		`${file}:${rank - 1}`,
		`${file - 1}:${rank}`,
		`${file + 1}:${rank}`,
	]
		.map(key => board[key])
		.filter(state => !!state)
}

import React, { Component } from 'react'
import _ from 'lodash'

import Square from '../square/'
import './board.css'

import viewport from './viewport'

const BOARD_PADDING = 64
const NUM_FILES = 4
const NUM_RANKS = 4
const fileAndRanks = []
for (let x = 0; x < NUM_FILES; x++) {
	for (let y = 0; y < NUM_RANKS; y++) {
		fileAndRanks.push({ x, y })
	}
}

class Board extends Component {
	constructor(props) {
		super(props)
		this.state = {
			viewport: viewport()
		}
		this.resizeSoon = _.debounce(this.resize, 200)
	}

	render() {
		const { viewport: { height, width } } = this.state
		const isLandscape = width > height
		let squareSize = isLandscape ?
			Math.floor((height - BOARD_PADDING)/NUM_RANKS) :
			Math.floor((width - BOARD_PADDING)/NUM_FILES)

		return (
			<div
				className="board"
				style={{
					height: `${squareSize*NUM_RANKS}px`,
					width: `${squareSize*NUM_FILES}px`,
				}}
			>
			{
				fileAndRanks.map(({ x, y }) =>
					<Square file={x} rank={y} size={squareSize} key={`${x}-${y}`} />
				)
			}
			</div>
		)
	}

	componentDidMount() {
		window.addEventListener('resize', this.resizeSoon)
	}

	resize = () => {
		this.setState({ viewport: viewport() })
	}
}

export default Board

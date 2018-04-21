import React, { Component } from 'react'
import _ from 'lodash'

import './board.css'

import viewport from './viewport'
import Squares from '../squares/'

const BOARD_PADDING = 64
const NUM_FILES = 4
const NUM_RANKS = 4

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
			Math.floor((height - BOARD_PADDING) / NUM_RANKS) :
			Math.floor((width - BOARD_PADDING) / NUM_FILES)

		return (
			<div
				className="board"
				style={{
					height: `${squareSize * NUM_RANKS}px`,
					width: `${squareSize * NUM_FILES}px`,
				}}
			>
				<Squares size={squareSize} />
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

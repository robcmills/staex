import React, { Component } from 'react'
import _ from 'lodash'

import './board.css'

import viewport from './viewport'

import TopStatus from '../status/top'
import BottomStatus from '../status/bottom'
import Squares from '../squares/'
import StackTargets from '../stack-targets/'
import TokenTargets from '../token-targets/'
import Tokens from '../tokens/'

import magicConnect from '../../redux/magic-connect'
import { boardSizeSelector } from '../../redux/selectors'

const BOARD_PADDING = 64

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
		const { boardSize } = this.props
		const isLandscape = width > height
		const squareSize = isLandscape ?
			Math.floor((height - BOARD_PADDING) / boardSize) :
			Math.floor((width - BOARD_PADDING) / boardSize)

		return (
			<div className="fullscreen">
				<TopStatus />
				<div
					className="board"
					style={{
						height: `${squareSize * boardSize}px`,
						width: `${squareSize * boardSize}px`,
					}}
				>
					<Squares size={squareSize} />
					<StackTargets size={squareSize} />
					<TokenTargets squareSize={squareSize} />
					<Tokens squareSize={squareSize} />
				</div>
				<BottomStatus />
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

export default magicConnect({
	selectors: {
		boardSize: boardSizeSelector,
	},
})(Board)

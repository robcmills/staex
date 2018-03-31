import React from 'react'
import { connect } from 'react-redux'

import Height from '../height/'
import Token from '../token/'
import './square.css'

const Square = ({
	file,
	rank,
	size,
	squareState: {
		color,
		height,
		token,
	},
}) => {
	console.log('render square', file, rank)
	return (
		<div
			className="square"
			style={{
				background: color,
				left: `${file * size}px`,
				bottom: `${rank * size}px`,
				height: `${size}px`,
				width: `${size}px`,
			}}
		>
			<div className="inner-square">
				{height && <Height squareSize={size}>{height}</Height>}
				{token && <Token squareSize={size} color={token} />}
			</div>
		</div>
	)
}

const mapStateToProps = ({ board }, { file, rank }) => {
	console.log('mapStateToProps', board, file, rank)
	return {
		squareState: board[`${file}:${rank}`],
	}
}

export default connect(mapStateToProps)(Square)

import React from 'react'
import { connect } from 'react-redux'

import Height from '../height/'
import Token from '../token/'
import './square.css'

const Square = ({ file, rank, squareState: { color, height, token } }) => {
	console.log('render square', file, rank)
	return (
		<div
			className="square"
			style={{
				background: color,
				left: `${file * 100}px`,
				bottom: `${rank * 100}px`,
			}}
		>
			<div className="inner-square">
				{height && <Height>{height}</Height>}
				{token && <Token color={token} />}
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

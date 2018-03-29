import React from 'react'
import { connect } from 'react-redux'

import './square.css'

const Square = ({ file, rank, squareState }) => {
	console.log('render square', file, rank)
	return (
		<div
			className="square"
			style={{
				background: squareState.color,
				left: `${file * 100}px`,
				bottom: `${rank * 100}px`,
			}}
		>
			<div className="inner-square" />
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

import React from 'react'
import { connect } from 'react-redux'

import mapStateToSelectors from '../../redux/map-state-to-selectors'
import {
	isValidStackTargetSelector,
	squareStateSelector,
} from '../../redux/selectors'

import Height from '../height/'
import Token from '../token/'
import './square.css'

const Square = ({
	file,
	isValidStackTarget,
	rank,
	size,
	squareState: {
		color,
		height,
		token,
	},
}) =>
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
			<div>{isValidStackTarget ? '1' : '0'}</div>
			{height && <Height squareSize={size}>{height}</Height>}
			{token && <Token squareSize={size} color={token} />}
		</div>
	</div>

export default connect(mapStateToSelectors({
	isValidStackTarget: isValidStackTargetSelector,
	squareState: squareStateSelector,
}))(Square)

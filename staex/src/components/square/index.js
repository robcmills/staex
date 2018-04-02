import React from 'react'
import { connect } from 'react-redux'

import mapStateToSelectors from '../../redux/map-state-to-selectors'
import {
	isValidStackTargetSelector,
	squareStateSelector,
} from '../../redux/selectors'

import Height from '../height/'
import Tokens from '../tokens/'
import './square.css'

import { playerColors } from '../../redux/constants'

const Square = ({
	file,
	isValidStackTarget,
	rank,
	size,
	squareState: {
		owner,
		height,
		tokens,
	},
}) =>
	<div
		className="square"
		style={{
			background: owner ? playerColors[owner].square : undefined,
			left: `${file * size}px`,
			bottom: `${rank * size}px`,
			height: `${size}px`,
			width: `${size}px`,
		}}
	>
		<div className="inner-square">
			<div>{isValidStackTarget ? '1' : '0'}</div>
			{height && <Height squareSize={size}>{height}</Height>}
			{tokens && <Tokens squareSize={size} tokens={tokens} />}
		</div>
	</div>

export default connect(mapStateToSelectors({
	isValidStackTarget: isValidStackTargetSelector,
	squareState: squareStateSelector,
}))(Square)

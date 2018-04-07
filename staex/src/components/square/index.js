import React from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import mapStateToSelectors from '../../redux/map-state-to-selectors'
import {
	activePlayerSelector,
	isValidStackTargetSelector,
	isValidTokenMoveTargetSelector,
	squareStateSelector,
} from '../../redux/selectors'

import Height from '../height/'
import Tokens from '../tokens/'
import ValidStackTarget from './valid-stack-target'
import ValidTokenTarget from './valid-token-target'
import './square.css'

const Square = ({
	activePlayer,
	file,
	isValidStackTarget,
	isValidTokenTarget,
	rank,
	size,
	squareState: {
		owner,
		height,
		tokens,
	},
}) =>
	<div
		className={cn('square', {
			[`player${owner}Square`]: owner,
			[`player${activePlayer}StackTarget`]: isValidStackTarget,
		})}
		style={{
			left: `${file * size}px`,
			bottom: `${rank * size}px`,
			height: `${size}px`,
			width: `${size}px`,
		}}
	>
		<div className="inner-square">
			{isValidStackTarget && <ValidStackTarget squareSize={size} />}
			{isValidTokenTarget && <ValidTokenTarget squareSize={size} activePlayer={activePlayer} />}
			{height && <Height squareSize={size}>{height}</Height>}
			{tokens && <Tokens squareSize={size} tokens={tokens} />}
		</div>
	</div>

export default connect(mapStateToSelectors({
	activePlayer: activePlayerSelector,
	isValidStackTarget: isValidStackTargetSelector,
	isValidTokenTarget: isValidTokenMoveTargetSelector,
	squareState: squareStateSelector,
}))(Square)

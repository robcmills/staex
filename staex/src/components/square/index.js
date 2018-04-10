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
import ValidTokenTarget from './valid-token-target'
import './square.css'

const Square = ({
	activePlayer,
	file,
	isValidTokenTarget,
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
		className={cn('square', {
			[`player${owner}Square`]: owner,
		})}
		style={{
			left: `${file * size}px`,
			bottom: `${rank * size}px`,
			height: `${size - 2}px`,
			width: `${size - 2}px`,
		}}
	>
		<div
			className={cn('inner-square', {
				validStackTargetSquare: isValidStackTarget,
			})}
		>
			{isValidTokenTarget &&
				<ValidTokenTarget
					rank={rank}
					file={file}
					squareSize={size}
				/>}
			{height > 0 &&
				<Height squareSize={size}>{height}</Height>}
			{tokens && !!tokens.length &&
				<Tokens squareSize={size} tokens={tokens} />}
		</div>
	</div>

export default connect(mapStateToSelectors({
	activePlayer: activePlayerSelector,
	isValidTokenTarget: isValidTokenMoveTargetSelector,
	isValidStackTarget: isValidStackTargetSelector,
	squareState: squareStateSelector,
}))(Square)

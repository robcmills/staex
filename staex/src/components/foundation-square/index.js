import React from 'react'
import cn from 'classnames'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	isValidStackTargetSelector,
	isValidTokenMoveTargetSelector,
	squareStateSelector,
} from '../../redux/selectors'

import Height from '../height/'
// import Tokens from '../tokens/'
// import ValidTokenTarget from './valid-token-target'
import './square.css'

const FoundationSquare = ({
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
		<div className="inner-square">
			{height > 0 &&
				<Height squareSize={size}>{height}</Height>}
			{/*tokens && !!tokens.length &&
				<Tokens squareSize={size} tokens={tokens} />*/}
		</div>
	</div>

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		squareState: squareStateSelector,
	},
})(FoundationSquare)

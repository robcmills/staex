import React from 'react'
import cn from 'classnames'

import Height from '../height/'
import './stack-target.css'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	isValidStackTargetSelector,
	squareStateSelector,
} from '../../redux/selectors'
import { stackAction } from '../../redux/action-creators'

const ValidStackTarget = ({
	activePlayer,
	file,
	isValidStackTarget,
	location,
	rank,
	size,
	stack,
	squareState: {
		owner,
		height,
		tokens,
	},
}) => isValidStackTarget ?
	<div
		className="stackTarget"
		style={{
			left: `${(file * size) - 2}px`,
			bottom: `${(rank * size) - 2}px`,
			height: `${size + 2}px`,
			width: `${size + 2}px`,
		}}
		onClick={() => stack({ rank, file })}
	>
		<div
			className={cn(
				'innerStackTarget',
				`player${activePlayer}StackTarget`, {
					[`player${owner}Square`]: !!owner,
				}
			)}
		>
			<div className='stackTargetOwnerHeight'>
				{height > 0 && <Height squareSize={size}>{height}</Height>}
			</div>
			<div className='stackTargetHeight'>
				<Height squareSize={size}>{height + 1}</Height>
			</div>
		</div>
	</div> :
	null

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		isValidStackTarget: isValidStackTargetSelector,
		squareState: squareStateSelector,
	},
	actionCreators: {
		stack: stackAction,
	},
})(ValidStackTarget)
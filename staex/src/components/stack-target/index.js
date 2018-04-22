import React from 'react'
import cn from 'classnames'

import Height from '../height/'
import './stack-target.css'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	heightSelector,
	ownerSelector,
} from '../../redux/selectors'
import { stackAction } from '../../redux/action-creators'

const StackTarget = ({
	activePlayer,
	binaryIndex,
	height,
	owner,
	size,
	stack,
	x,
	y,
}) =>
	<div
		className="stackTarget"
		style={{
			left: `${(x * size) - 2}px`,
			bottom: `${(y * size) - 2}px`,
			height: `${size + 2}px`,
			width: `${size + 2}px`,
		}}
	>
		<div
			className={cn(
				'innerStackTarget',
				`player${activePlayer}StackTarget`, {
					[`player${owner}Square`]: owner,
				}
			)}
			onClick={() => stack({ activePlayer, binaryIndex })}
		>
			<div className='stackTargetOwnerHeight'>
				{height > 0 && <Height squareSize={size}>{height}</Height>}
			</div>
			<div className='stackTargetHeight'>
				<Height squareSize={size}>{height + 1}</Height>
			</div>
		</div>
	</div>

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		height: heightSelector,
		owner: ownerSelector,
	},
	actions: {
		stack: stackAction,
	},
})(StackTarget)
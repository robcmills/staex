import React from 'react'
import cn from 'classnames'

import Height from '../height/'

import magicConnect from '../../redux/magic-connect'
import {
	heightSelector,
	ownerSelector,
} from '../../redux/selectors'

import './square.css'

const Square = ({ height, owner, size, x, y }) =>
	<div
		className={cn('square', {
			[`player${owner}Square`]: owner,
		})}
		style={{
			left: `${x * size}px`,
			bottom: `${y * size}px`,
			height: `${size - 2}px`,
			width: `${size - 2}px`,
		}}
	>
		<div className="inner-square">
			{height > 0 && <Height squareSize={size}>{height}</Height>}
		</div>
	</div>

export default magicConnect({
	selectors: {
		height: heightSelector,
		owner: ownerSelector,
	},
})(Square)
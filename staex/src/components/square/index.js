import React from 'react'
import cn from 'classnames'

import magicConnect from '../../redux/magic-connect'
import {
	ownerSelector,
} from '../../redux/selectors'

import './square.css'

const Square = ({ owner, size, x, y }) =>
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
		<div className="inner-square" />
	</div>

export default magicConnect({
	selectors: {
		owner: ownerSelector,
	},
})(Square)
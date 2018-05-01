import React from 'react'
import cn from 'classnames'

import magicConnect from '../../redux/magic-connect'
import { winnerSelector } from '../../redux/selectors'

import './status.css'

const BottomStatus = ({ winner }) =>
	<div className={cn('bottom', 'status')}>
		{!!winner && `Player ${winner} wins`}
	</div>

export default magicConnect({
	selectors: {
		winner: winnerSelector,
	},
})(BottomStatus)
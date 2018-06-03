import React from 'react'
import cn from 'classnames'

import magicConnect from '../../redux/magic-connect'
import { winnerSelector } from '../../redux/selectors'

import './status.css'

const BottomStatus = ({ winner }) =>
	<div className={cn('bottom', 'status')}>
		{!!winner && `${winner === 1 ? 'You win!' : 'Computer wins'}`}
	</div>

export default magicConnect({
	selectors: {
		winner: winnerSelector,
	},
})(BottomStatus)
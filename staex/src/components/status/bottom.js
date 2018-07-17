import React from 'react'
import cn from 'classnames'

import magicConnect from '../../redux/magic-connect'
import { activePlayerSelector, winnerSelector } from '../../redux/selectors'

import './status.css'

const BottomStatus = ({ activePlayer, winner }) => {
	if (winner > 0) {
		return (
			<div className={cn('bottom', 'status', `player${winner}Score`)}>
				{!!winner && `${winner === 1 ? 'You win!' : 'Computer wins'}`}
			</div>
		)
	}
	return (
		<div className={cn('bottom', 'status', `player${activePlayer}Score`)}>
			{activePlayer === 1 ? 'Your move' : 'Computer is thinking...'}
		</div>
	)
}

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		winner: winnerSelector,
	},
})(BottomStatus)
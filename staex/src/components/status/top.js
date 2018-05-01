import React from 'react'
import cn from 'classnames'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	player1ScoreSelector,
	player2ScoreSelector,
	winnerSelector,
} from '../../redux/selectors'

import './status.css'

const TopStatus = ({ activePlayer, player1Score, player2Score, winner }) =>
	<div className={cn('top', 'status')}>
		<span className={cn('player1Score', { active: !winner && activePlayer === 1 })}>
			{player1Score}
		</span>
		{' - '}
		<span className={cn('player2Score', { active: !winner && activePlayer === 2 })}>
			{player2Score}
		</span>
	</div>

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		player1Score: player1ScoreSelector,
		player2Score: player2ScoreSelector,
		winner: winnerSelector,
	},
})(TopStatus)
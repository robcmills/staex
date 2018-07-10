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
		{activePlayer === 2 && !(winner) &&
			<span className="hidden-dots">...&nbsp;</span>}
		<span className={cn('player1Score', { active: !winner && activePlayer === 1 })}>
			HUM:{player1Score}
		</span>
		&nbsp;{' - '}&nbsp;
		<span className={cn('player2Score', { active: !winner && activePlayer === 2 })}>
			COM:{player2Score}
		</span>
		{activePlayer === 2 && !(winner) &&
			<span>
				&nbsp;
				<span className="dot dot1">.</span>
				<span className="dot dot2">.</span>
				<span className="dot dot3">.</span>
			</span>}
	</div>

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		player1Score: player1ScoreSelector,
		player2Score: player2ScoreSelector,
		winner: winnerSelector,
	},
})(TopStatus)
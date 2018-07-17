import React from 'react'
import cn from 'classnames'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	player1ScoreSelector,
	player2ScoreSelector,
	winnerSelector,
	winScoreSelector,
} from '../../redux/selectors'

import './status.css'

const TopStatus = ({ activePlayer, player1Score, player2Score, winner, winScore }) =>
	<div className={cn('top', 'status')}>
		<span className={cn('player1Score', { active: !winner && activePlayer === 1 })}>
			HUM:{player1Score}/{winScore}
		</span>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<span className={cn('player2Score', { active: !winner && activePlayer === 2 })}>
			COM:{player2Score}/{winScore}
		</span>
	</div>

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		player1Score: player1ScoreSelector,
		player2Score: player2ScoreSelector,
		winner: winnerSelector,
		winScore: winScoreSelector,
	},
})(TopStatus)
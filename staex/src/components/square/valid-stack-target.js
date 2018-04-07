import React from 'react'
import cn from 'classnames'

import Height from '../height/'
import './valid-stack-target.css'

import magicConnect from '../../redux/magic-connect'
import { activePlayerSelector } from '../../redux/selectors'
import { stackAction } from '../../redux/action-creators'

const ValidStackTarget = ({
	activePlayer,
	height,
	location,
	squareSize,
	stack,
	rank,
	file,
}) =>
	<div
		className={cn(
			'stackTarget',
			`player${activePlayer}StackTarget`,
		)}
		onClick={() => stack({ rank, file })}
	>
		<Height squareSize={squareSize}>{height}</Height>
	</div>

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
	},
	actionCreators: {
		stack: stackAction,
	},
})(ValidStackTarget)
import React from 'react'

import magicConnect from '../../redux/magic-connect'
import { activePlayerSelector } from '../../redux/selectors'

import './progress-bar.css'

const ProgressBar = ({ activePlayer }) => activePlayer === 2 &&
	<div className="progressBarWrapper">
		<div className="bar">
			<div className="progress" />
		</div>
	</div>

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
	},
})(ProgressBar)
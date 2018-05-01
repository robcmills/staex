import React from 'react'
import cn from 'classnames'

import magicConnect from '../../redux/magic-connect'
import { activePlayerSelector } from '../../redux/selectors'

import './progress-bar.css'

class ProgressBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = { isStarted: false }
	}
	render() {
		const { activePlayer } = this.props
		const { isStarted } = this.state
		return (activePlayer === 2 &&
			<div className="progressBar">
				<div className="bar">
					<div
						className={cn('progress', isStarted ? 'end' : 'start')}
					/>
				</div>
			</div>
		)
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isStarted: true })
		}, 10)
	}
}

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
	},
})(ProgressBar)
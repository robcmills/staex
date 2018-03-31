import React from 'react'
import { connect } from 'react-redux'

import './status.css'
import ActionSelect from './action-select/'

const Status = ({ activePlayer }) =>
	<div className="status">
		Player {activePlayer} to play <ActionSelect /> action
	</div>

const mapStateToProps = ({
	activePlayer,
}) => ({
	activePlayer,
})

export default connect(mapStateToProps)(Status)

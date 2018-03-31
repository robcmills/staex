import React from 'react'
import { connect } from 'react-redux'

const ActionSelect = ({ activeAction }) =>
	<select name="action">
	  <option value="stack" selected={activeAction === 'stack'}>stack</option>
	  <option value="move" selected={activeAction === 'move'}>move</option>
	</select>

const mapStateToProps = ({
	activeAction,
}) => ({
	activeAction,
})

export default connect(mapStateToProps)(ActionSelect)

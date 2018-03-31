import React from 'react'
import { connect } from 'react-redux'

const ActionSelect = ({ activeAction }) =>
	<select name="action" defaultValue={activeAction}>
	  <option value="stack">stack</option>
	  <option value="move">move</option>
	</select>

const mapStateToProps = ({
	activeAction,
}) => ({
	activeAction,
})

export default connect(mapStateToProps)(ActionSelect)

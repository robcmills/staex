import React, { Component } from 'react'

import './node.css'

class Node extends Component {
	constructor(props) {
		super(props)
		this.state = { isExpanded: false }
	}

	render() {
		return (
			<div className="node" onClick={this.toggleExpanded}>
				{this.state.isExpanded ? '-' : '+'}
				&nbsp;
				{this.props.node.toString()}
			</div>
		)
	}

	toggleExpanded = () => {
		this.setState({ isExpanded: !this.state.isExpanded })
	}
}

export default Node

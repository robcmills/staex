import React, { Component } from 'react'

import './node.css'

class Node extends Component {
	constructor(props) {
		super(props)
		this.state = { isExpanded: props.isExpanded || false }
	}

	render() {
		const { isExpanded } = this.state
		const { node } = this.props
		return (
			<div className="node-container">
				<div className="node" onClick={this.toggleExpanded}>
					{node.children.length > 0 && (isExpanded ? '- ' : '+ ')}
					{node.children.length === 0 && '× '}
					{node.toString()}
				</div>
				{isExpanded &&
					<div className="node-children">
						{node.children.map((child, index) =>
							<Node node={child} key={index} />)}
					</div>
				}
			</div>
		)
	}

	toggleExpanded = () => {
		this.setState({ isExpanded: !this.state.isExpanded })
	}
}

export default Node

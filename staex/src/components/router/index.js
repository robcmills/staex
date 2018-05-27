import React, { Component } from 'react'

import Tree from '../tree/'
import Board from '../board/'

class Router extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hash: window.location.hash,
		}
	}

	render() {
		switch(this.state.hash) {
			case '#tree':
				return <Tree />
			default:
				return <Board />
		}
	}

	componentDidMount() {
		window.onhashchange = () => {
			if (window.location.hash !== this.state.hash) {
				this.setState({ hash: window.location.hash })
			}
		}
	}
}

export default Router

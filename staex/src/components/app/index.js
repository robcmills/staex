import React from 'react'

import TopStatus from '../status/top'
import BottomStatus from '../status/bottom'
import Board from '../board/'

import './app.css'

const App = () =>
	<div className="app">
		<TopStatus />
		<Board />
		<BottomStatus />
	</div>

export default App

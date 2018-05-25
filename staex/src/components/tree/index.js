import React from 'react'

import mcts from '../../mcts/singleton'
import Node from './node'

import './tree.css'

const Tree = () => (
	<div className="tree">
		{mcts.mcts && <Node node={mcts.mcts.rootNode} isExpanded />}
	</div>
)

export default Tree

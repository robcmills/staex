import React from 'react'

import mcts from '../../mcts/singleton'

const Tree = () => (
	<div className="tree">
		{mcts.mcts && mcts.mcts.rootNode.toString()}
	</div>
)

export default Tree

import React from 'react'

import Square from '../square/'
import './board.css'

const Board = () =>
  <div className="board">
  	<Square file={0} rank={0} />
  	<Square file={1} rank={0} />
  	<Square file={2} rank={0} />
  	<Square file={0} rank={1} />
  	<Square file={1} rank={1} />
  	<Square file={2} rank={1} />
  	<Square file={0} rank={2} />
  	<Square file={1} rank={2} />
  	<Square file={2} rank={2} />
  </div>

export default Board

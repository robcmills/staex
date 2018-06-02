#include <iostream>
#include "staex.h"

extern "C" {
	int compute_move(
		int board_size,
		int p1_squares,
		int p2_squares,
		int p1_token,
		int p2_token,
		int* heights
	) {
		std::cout << "compute_move (cpp)" << std::endl;

		BoardState board = vector<vector<SquareState>>(
			board_size,
			vector<SquareState>(
				board_size,
				INITIAL_SQUARE_STATE
			)
		);

		for (int y=0; y<board_size; ++y) {
			for (int x=0; x<board_size; ++x) {
				board[y][x].height = heights[y * board_size + x];
			}
		}

		print_board(board, board_size);
		return 0;
	}
}

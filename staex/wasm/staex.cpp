#include <iostream>

extern "C" {
	int compute_move(
		int boardSize,
		int player1Squares,
		int player2Squares,
		int player1Token,
		int player2Token,
		int* squareHeights
	) {
		std::cout << "MyFunction (cpp)";
		std::cout << " player1Squares:" << player1Squares;
		std::cout << " player2Squares:" << player2Squares;
		std::cout << std::endl;
		std::cout << "squareHeights:";
		for (int i = 0; i < (boardSize * boardSize); ++i) {
			std::cout << squareHeights[i] << ",";
		}
		std::cout << std::endl;
		return 0;
	}
}

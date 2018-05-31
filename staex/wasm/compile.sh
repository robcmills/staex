# First install emscripten and activate compiler environment
# source ~/src/emsdk/emsdk_env.sh
em++ \
	-o ../public/staex.js \
	staex.cpp -O3 \
	-std=c++11 \
	-s WASM=1 \
	-s EXPORTED_FUNCTIONS="['_myFunction']"

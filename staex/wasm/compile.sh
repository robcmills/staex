# First install emscripten and activate compiler environment
# source ~/src/emsdk/emsdk_env.sh
em++ \
	-o ../public/staex.em.js \
	staex.cpp -O3 \
	-std=c++11 \
	--post-js staex.post.js \
	-s WASM=1 \
	-s EXPORTED_FUNCTIONS="['_compute_move']" \
	-s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall']"

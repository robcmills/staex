# First install emscripten and activate compiler environment
# source ~/src/emsdk/emsdk_env.sh
em++ \
	-o ../public/staex.em.js \
	staex.cpp \
	-std=c++11 \
	-O3 \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s WASM=1 \
	-s EXPORTED_FUNCTIONS="['_safe_compute_move']" \
	-s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall']"

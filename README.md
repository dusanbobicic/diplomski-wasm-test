# WASM Test Environment

## To start coding

### Setup

Type `npm install` to install all dependencies. After succesfull instalation you can type `npm start` to run the app.

To build WASM modules you will need [Emstripten](https://emscripten.org/) tool installed.
To build WASM modules first use `emsd activate latest` command to activate `emcc` compiler, and then use on of these commands inside wasm-modules folder:
- Building the Grayscale module: `emcc grayscale.cpp -s WASM=1 -O1 -s ALLOW_MEMORY_GROWTH=1 -s EXPORT_ALL=1 -s LINKABLE=1 -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -s EXPORTED_FUNCTIONS='["_grayScale_average","_grayScale_w1","_grayScale_luma","_grayScale_GT601","_malloc"]' -o wasm-grayscale.js -s EXPORT_NAME="'GrayscaleModuleWASM'" -s MODULARIZE=1`

- Building the Invert module: `emcc invert.cpp -s WASM=1 -O1 -s ALLOW_MEMORY_GROWTH=1 -s EXPORT_ALL=1 -s LINKABLE=1 -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -s EXPORTED_FUNCTIONS='["_invertImage","_malloc"]' -o wasm-invert.js -s EXPORT_NAME="'InvertModuleWASM'" -s MODULARIZE=1`

- Building the Math module: `emcc math.cpp -s WASM=1 -O1 -s ALLOW_MEMORY_GROWTH=1 -s EXPORT_ALL=1 -s LINKABLE=1 -s "EXPORTED_RUNTIME_METHODS=['ccall','cwrap']" -s EXPORTED_FUNCTIONS='["_sumFactFibo","_malloc"]' -o wasm-math.js -s EXPORT_NAME="'MathModuleWASM'" -s MODULARIZE=1`

- To build your own module you will need to change the name of input files, output files, functions and the value of `EXPORT_NAME` to what suits your need.

After succesfull build you should copy output files to the `public` folder and serve them with a `script` tag inside `index.html` as shown below:

```html
<script src="wasm-mymodule.js"></script>
```

## Building the app

Type `npm run build` to build optimized production build.

## Happy Hacking :D
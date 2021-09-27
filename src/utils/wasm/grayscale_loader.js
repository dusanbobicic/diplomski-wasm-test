
export const grayScale_average=async (imageData)=>{
    const wasm = window.GrayscaleModule;
    const { length } = imageData;
    const memory = wasm._malloc(length); // Allocating WASM memory
    wasm.HEAPU8.set(imageData, memory); // Copying JS image data to WASM memory
    wasm._grayScale_average(memory, length); // Calling WASM method
    const filteredImageData = wasm.HEAPU8.subarray(memory, memory + length); // Converting WASM data to JS Image data
    wasm._free(memory); // Freeing WASM memory
    return filteredImageData;

}
export const grayScale_w1=async (imageData)=>{
    const wasm = window.GrayscaleModule;
    const { length } = imageData;
    const memory = wasm._malloc(length); // Allocating WASM memory
    wasm.HEAPU8.set(imageData, memory); // Copying JS image data to WASM memory
    wasm._grayScale_w1(memory, length); // Calling WASM method
    const filteredImageData = wasm.HEAPU8.subarray(memory, memory + length); // Converting WASM data to JS Image data
    wasm._free(memory); // Freeing WASM memory
    return filteredImageData;
}
export const grayScale_luma=async (imageData)=>{
    const wasm = window.GrayscaleModule;
    const { length } = imageData;
    const memory = wasm._malloc(length); // Allocating WASM memory
    wasm.HEAPU8.set(imageData, memory); // Copying JS image data to WASM memory
    wasm._grayScale_luma(memory, length); // Calling WASM method
    const filteredImageData = wasm.HEAPU8.subarray(memory, memory + length); // Converting WASM data to JS Image data
    wasm._free(memory); // Freeing WASM memory
    return filteredImageData;
}
export const grayScale_GT601=async(imageData)=>{
    const wasm = window.GrayscaleModule;
    const { length } = imageData;
    const memory = wasm._malloc(length); // Allocating WASM memory
    wasm.HEAPU8.set(imageData, memory); // Copying JS image data to WASM memory
    wasm._grayScale_GT601(memory, length); // Calling WASM method
    const filteredImageData = wasm.HEAPU8.subarray(memory, memory + length); // Converting WASM data to JS Image data
    wasm._free(memory); // Freeing WASM memory
    return filteredImageData;
}

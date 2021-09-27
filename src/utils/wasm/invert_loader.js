export const invertImage=async (imageData)=>{
    const wasm = window.InvertImageModule;
    const { length } = imageData;
    const memory = wasm._malloc(length); // Allocating WASM memory
    wasm.HEAPU8.set(imageData, memory); // Copying JS image data to WASM memory
    wasm._invertImage(memory, length); // Calling WASM method
    const filteredImageData = wasm.HEAPU8.subarray(memory, memory + length); // Converting WASM data to JS Image data
    wasm._free(memory); // Freeing WASM memory
    return filteredImageData;
}
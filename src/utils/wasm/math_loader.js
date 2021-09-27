const sumFactFibo = (n = 0) => {
    const wasm = window.MathModule;
    return BigInt(wasm._sumFactFibo(n));
}


export { sumFactFibo };
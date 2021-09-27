function toCanvas(source) {
    if (source instanceof HTMLCanvasElement) {
        return source;
    }
    const canvas = document.createElement("canvas");
    canvas.width = source.videoWidth || source.naturalWidth || source.width;
    canvas.height = source.videoHeight || source.naturalHeight || source.height;
    canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);
    return canvas;
}

export async function getImageData({ url, width = 244, height = 224 }) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.width = width;
        img.height = height;
        img.onload = function() {
            var canvas = toCanvas(img);
            resolve(
                canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height)
            );
        };
        img.onerror = function(e) {
            reject(e);
        };
    });
}

export function writeImageDataToCanvas(canvas, data, width, height) {
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    var imageData = context.createImageData(width, height);
    imageData.data.set(data);
    context.putImageData(imageData, 0, 0);
    return canvas;
}
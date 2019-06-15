import Color from 'color';

/**
 * Convert image into a given color palatte.
 *
 * @param {Image | HTMLCanvasElement} image      input image
 * @param {string[]}                  [palatte=['#fff','#999','#555','#222']]
 *                                        colors of output image
 * @param {string}                    [colorSpace='rgb'] color space
 * @return {HTMLCanvasElement}        output image on canvas
 */
export default function sunglass(image, palatte, colorSpace) {
    if (!palatte) {
        palatte = ['#fff', '#999', '#555', '#222'];
    }
    if (!colorSpace) {
        colorSpace = 'rgb';
    }

    const width = image.width;
    const height = image.height;
    if (!width || !height) {
        throw 'Image should have width and height.';
    }

    let srcCanvas;
    let srcCtx;
    if (image instanceof Image) {
        srcCanvas = createCanvas(width, height);
        srcCtx = srcCanvas.getContext('2d');
        srcCtx.drawImage(image, 0, 0);
    }
    else if (image instanceof HTMLCanvasElement) {
        srcCanvas = image;
        srcCtx = srcCanvas.getContext('2d');
    }
    else {
        throw 'Image should be instance of Image or HTMLCanvasElement';
    }

    const distCanvas = createCanvas(width, height);
    const distCtx = distCanvas.getContext('2d');

    const srcPixels = srcCtx.getImageData(0, 0, width, height).data;
    const distImageData =  distCtx.createImageData(width, height);
    const distPixels = distImageData.data;

    for (let i = 0, len = srcPixels.length; i < len; i += 4) {
        const a = srcPixels[i + 3] / 255;
        // Take rgb as original color and blending with white with alpha
        const r = srcPixels[i] * a + 255 * (1 - 1);
        const g = srcPixels[i + 1] * a + 255 * (1 - 1);
        const b = srcPixels[i + 2] * a + 255 * (1 - 1);

        let minDistance = Number.MAX_VALUE;
        let minDistancePalatteId = null;
        for (let p = 0; p < palatte.length; ++p) {
            // TODO: cache palatte in hsv
            const d = distance(Color.rgb(r, g, b), Color(palatte[p]), colorSpace);
            if (d < minDistance) {
                minDistance = d;
                minDistancePalatteId = p;
            }
        }

        // Use closest palatte to fill dist image
        const distColor = Color(palatte[minDistancePalatteId]);
        distPixels[i] = distColor.color[0];
        distPixels[i + 1] = distColor.color[1];
        distPixels[i + 2] = distColor.color[2];
        distPixels[i + 3] = 255;
    }
    distCtx.putImageData(distImageData, 0, 0);

    return distCanvas;
};

function distance(srcColor, distColor, colorSpace) {
    if (colorSpace === 'hsv') {
        srcColor.hsv();
        distColor.hsv();
    }
    else if (colorSpace === 'hsl') {
        srcColor.hsl();
        distColor.hsl();
    }
    else if (colorSpace !== 'rgb') {
        console.warn('Color space ' + colorSpace + ' is not supported. Use RGB now.');
    }

    const c1 = srcColor.color;
    const c2 = distColor.color;
    return (c1[0] - c2[0]) * (c1[0] - c2[0])
        + (c1[1] - c2[1]) * (c1[1] - c2[1])
        + (c1[2] - c2[2]) * (c1[2] - c2[2]);
}

function createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

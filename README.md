# sunglass 😎

Convert image into a given color palette.

|Input Image|Input Palette|Output Image|
|-|-|-|
|![](./res/input.jpg)|![](./res/palette.png)|![](./res/output.png)|
|![](./res/input2.png)|![](./res/palette2.png)|![](./res/output2.png)|

This project was originally created for my [personal website](http://zhangwenli.com);

### API

```
/**
 * Convert image into a given color palette.
 *
 * @param {Image | HTMLCanvasElement} image      input image
 * @param {string[]}                  [palette=['#fff','#999','#555','#222']]
 *                                        colors of output image
 * @param {string}                    [colorSpace='rgb'] color space
 * @return {HTMLCanvasElement}        output image on canvas
 */
sunglass(image[, palette[, colorSpace]])
```

### Example

```ts
import sunglass from 'sunglass';

const img = new Image();
img.onload = () => {
    const palette = ['#d1c4af','#a39990','#363132'];
    const outputCanvas = sunglass(img, palette);
    console.log(outputCanvas.toDataURL()); // base64 string of output image
};
img.src = '...';
```

# sunglass 😎

Convert image into a given color palatte.

|Input Image|Input Palatte|Output Image|
|-|-|-|
|![](./res/input.jpg)|<div style="width:20px;height:20px;margin:5px;background:#d1c4af"></div><div style="width:20px;height:20px;margin:5px;background:#a39990"></div><div style="width:20px;height:20px;margin:5px;background:#786f69"></div><div style="width:20px;height:20px;margin:5px;background:#585356"></div><div style="width:20px;height:20px;margin:5px;background:#504a4b"></div><div style="width:20px;height:20px;margin:5px;background:#363132"></div>|![](./res/output.png)|
|![](./res/input2.png)|<div style="width:20px;height:20px;margin:5px;background:#d1c4af"></div><div style="width:20px;height:20px;margin:5px;background:#a39990"></div><div style="width:20px;height:20px;margin:5px;background:#363132"></div>|![](./res/output2.png)|

This project was originally created for my [personal website](http://zhangwenli.com);

### API

```
/**
 * Convert image into a given color palatte.
 *
 * @param {Image | HTMLCanvasElement} image      input image
 * @param {string[]}                  [palatte=['#fff','#999','#555','#222']]
 *                                        colors of output image
 * @param {string}                    [colorSpace='rgb'] color space
 * @return {HTMLCanvasElement}        output image on canvas
 */
sunglass(image[, palatte[, colorSpace]])
```

### Example

```ts
import sunglass from 'sunglass';

const img = new Image();
img.onload = () => {
    const palatte = ['#d1c4af','#a39990','#363132'];
    const outputCanvas = sunglass(img, palatte);
    console.log(outputCanvas.toDataURL()); // base64 string of output image
};
img.src = '...';
```

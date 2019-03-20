import Color from 'color';
import sunglass from '../src/sunglass';

const palatte = ['#d1c4af', '#a39990', '#786f69', '#585356', '#504a4b', '#413a3b'];
const palatteHex = palatte.map(p => Color(p).hex());

describe('Color test', function () {
    it('should have color from palatte', function () {
        // TODO: output looks fine, but failed test
        const srcImg = getTestImage();
        const distImg = sunglass(srcImg, palatte);
        console.log(distImg.toDataURL('png'));

        const ctx = distImg.getContext('2d');
        const pixels = ctx.getImageData(0, 0, distImg.width, distImg.height).data;

        let isFromPalatte = true;
        for (let i = 0; i < pixels.length; ++i) {
            const color = Color.rgb(pixels[i], pixels[i + 1], pixels[i + 2]);
            if (palatteHex.indexOf(color.hex()) < 0) {
                console.error(color.hex());
                isFromPalatte = false;
                break;
            }
        }

        expect(isFromPalatte).toEqual(true);
    });
});

function getTestImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(20, 0, 50, 0);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(.5, 'cyan');
    gradient.addColorStop(1, 'red');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log('src', canvas.toDataURL('png'));
    return canvas;
}

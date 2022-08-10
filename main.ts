//% color="#2b2c6e" icon="\uf067"
namespace extras {
    /**
     * Shuffles arrays
     */
    //% group="Arrays"
    //% block="shuffle array $array"
    //% array.shadow="lists_create_with"
    export function shuffleArray(array: any[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    //% block="show string $s with interval $interval"
    //% color="#2a8ff7"
    //% group="Strings"
    export function showString(s: string, interval: number) {
        basic.showString(s, interval);
    }

    //% group="Filters"
    //% block="create smoother"
    //% blockSetVariable="smoothOutput"
    //% weight=100
    export function createSmoother(): MovingAverageSmoother {
        return new MovingAverageSmoother();
    }

    //% group="ImageMap"
    //% block="create image map with images $imgs"
    //% blockSetVariable="imageMap"
    //% imgs.shadow="lists_create_with"
    //% weight=100
    export function createImgMap(imgs: Image[]): ImageMap {
        return new ImageMap(imgs);
    }
}

//% blockNamespace=extras
class ImageMap {
    private imgs: Image[];
    private maxVal: number;

    constructor(imgs: Image[]) {
        this.imgs = imgs;
    }

    //% block="amplify value with %extras(imageMap) value $input || with max value %max"
    //% group="ImageMap"
    getAmplifiedVal(input: number, max = 255) {
        return input / this.maxVal * max;
    }

    private updateMaxVal(input: number) {
        this.maxVal = Math.max(this.maxVal, input);
    }

    //% block="change images of %extras(imgeMap) to $imgs"
    //% group="ImageMap"
    changeImgs(imgs: Image[]) {
        this.imgs = imgs;
    }

    //% block="map images of %extras(imageMap) to $input"
    //% group="ImageMap"
    mapImgs(input: number) {
        this.updateMaxVal(input);
        const step = this.maxVal / this.imgs.length;
        if (this.imgs.length) {
            const index = Math.clamp(0, this.imgs.length - 1,
                Math.floor(input / step));
            this.imgs[index].showImage(0, 5);
        }
    }
}

//% blockNamespace=extras
class MovingAverageSmoother {
    private values: number[];

    constructor() {
        this.values = [];
    }

    private avg(points: number): number {
        return this.values.reduce((prevSum, n) => prevSum + n, 0) / points;
    }

    //% block="get output of %extras(smoothOutput) of value $input with $points points"
    //% group="Filters"
    //% weight=50
    getOutput(input: number, points: number): number {
        if (this.values.length == 0) {
            this.values.push(input);
            return input;
        } else if (this.values.length < points) {
            this.values.push(input);
            return this.avg(points);
        } else {
            this.values.shift();
            this.values.push(input);
            return this.avg(points);
        }
    }
}

//% color="#72a875" icon="\uf130"
namespace sound {
    let maxVol = 0;
    const getAmplifiedVol = (soundLevel: number) => soundLevel / maxVol * 255;

    function updateMaxVol(soundLevel: number) {
        maxVol = Math.max(maxVol, soundLevel);
    }

    //% block="map LEDs $imgs to the sound level"
    //% imgs.shadow="lists_create_with"
    //% imgs.defl=device_build_image
    export function mapImagesToVolume(imgs: Image[]) {
        const soundLevel = input.soundLevel();
        updateMaxVol(soundLevel)
        const step = maxVol / imgs.length;
        if (imgs.length) {
            const index = Math.clamp(0, imgs.length - 1,
                Math.floor(soundLevel / step));
            imgs[index].showImage(0, 5);
        }
    }

    /**
     * Reset Max Volume Level Detected
     */
    //% block="reset max volume detected"
    export function resetMaxVol() {
        maxVol = 0;
    }

    /**
     * Amplifies the max volume recorded to 255
     */
    //% block="amplified sound level"
    export function getAmplifiedSoundLevel(): number {
        const soundLevel = input.soundLevel();
        updateMaxVol(soundLevel)
        return getAmplifiedVol(soundLevel);
    }
}

//% blockNamespace="compass" icon="\uf14e"
//% color="#eb9710"
namespace compass {

    //% block="show compass arrow"
    export function showCompassArrow() {
        basic.showArrow(Math.round(input.compassHeading() / 45) % 8);
    }
}
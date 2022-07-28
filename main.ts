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

    //% group="Filters"
    //% block="create smoother"
    //% blockSetVariable="smoothOutput"
    export function createSmoother(): MovingAverageSmoother {
        return new MovingAverageSmoother();
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

//% color="#c938c7" icon="\uf130"
namespace sound {
    let maxVol = 0;
    const getAmplifiedVol = (soundLevel: number) => input.soundLevel() / maxVol * 255;

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
        let index = 0;
        if (imgs.length) {
            index = Math.clamp(0, imgs.length - 1,
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


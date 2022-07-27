//% color="#2b2c6e" icon="\uf067"
namespace extras {
    /**
     * Simple moving average
     */
    //% group="Filters"
    //% block="smoothen value $input with $points points"
    export function smoothenValue(input: number, points: number): number {
        const values: number[] = [];
        const avg = () => values.reduce((prev: number, curr: number) => prev + curr, 0) / points;
        if (values.length == 0) {
            values.push(input);
            return input;
        } else if (values.length < points) {
            values.push(input);
            return avg();
        } else {
            values.shift();
            values.push(input);
            return avg();
        }
    }
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

    let maxVol = 0;

    //% group="Sound"
    //% block="map $imgs to the sound level"
    //% imgs.shadow="lists_create_with"
    export function mapImagesToVolume(imgs: Image[]) {
        maxVol = Math.max(maxVol, input.soundLevel());
        const getAmplifiedVol = () => input.soundLevel() / maxVol * 255;
        const step = 255 / imgs.length;
        imgs.length && imgs[Math.clamp(0, imgs.length - 1, Math.round(getAmplifiedVol() / step))].showImage(0);
    }

    /**
     * Reset Max Volume Level Detected
     */
    //% group="Sound"
    //% block="reset max volume detected"
    export function resetMaxVol() {
        maxVol = 0;
    }
}


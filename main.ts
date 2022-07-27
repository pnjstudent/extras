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
}

//% color="#c938c7" icon="\uf130"
namespace sound {
    let maxVol = 0;
    const getAmplifiedVol = () => input.soundLevel() / maxVol * 255;

    //% block="map $imgs to the sound level"
    //% imgs.shadow="lists_create_with"
    export function mapImagesToVolume(imgs: Image[]) {
        maxVol = Math.max(maxVol, input.soundLevel());
        const step = maxVol / imgs.length;
        let index = 0;
        if (imgs.length) {
            index = Math.clamp(0, imgs.length - 1,
                Math.floor(input.soundLevel() / step));
        }
        imgs[index].showImage(0, 5);
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
        maxVol = Math.max(maxVol, input.soundLevel());
        return getAmplifiedVol();
    }
}


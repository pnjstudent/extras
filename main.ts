namespace algorithms {
    /**
     * Simple moving average
     */
    //% group="Filters"
    //% blockId=algosma
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
    //% blockId=algosshufflearr
    //% block="shuffle array $array=variables_get(list)"
    export function shuffleArray(array: any[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

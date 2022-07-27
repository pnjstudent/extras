namespace algorithms {
    /**
     * Simple moving average
     */
    //% blockId=algosma
    //% block="smoothen value $v with $p points"
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
}
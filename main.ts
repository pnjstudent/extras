function smoothenValue (input: number, points: number) {
	const values: number[] = [];
    const avg = () => values.reduce((prev: number, curr: number) => prev + curr, 0) / points;
    if (values.length == 0) {
        values.push(input);
        return input;
    } else if ( values.length < points) {
        values.push(input);
        return avg();
    } else {
        values.shift();
        values.push(input);
        return avg();
    }
}
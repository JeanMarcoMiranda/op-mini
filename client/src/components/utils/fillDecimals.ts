const fillDecimals = (number: number) => {
    function pad(input: string, length: number, padding: number): string {
        let str = input + '';
        return (length <= str.length) ? str : pad(str + padding, length, padding);
    }
    let str = number + '';
    let dot = str.lastIndexOf('.');
    let isDecimal = dot !== -1;
    let integer = isDecimal ? str.substr(0, dot) : str;
    let decimals = isDecimal ? str.substr(dot + 1) : '';
    decimals = pad(decimals, 2, 0);
    return integer + '.' + decimals;
}

export default fillDecimals
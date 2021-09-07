const isNumeric = (str: string | number) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(parseInt(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export default isNumeric
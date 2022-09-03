const arraySum = (array, keyToSum) => {
    return array.reduce((partialSum, e) => partialSum + e[keyToSum], 0)
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export {arraySum, capitalize}
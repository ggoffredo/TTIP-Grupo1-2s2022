const arraySum = (array, keyToSum) => {
    return array.reduce((partialSum, e) => partialSum + e[keyToSum], 0)
}

export {arraySum}
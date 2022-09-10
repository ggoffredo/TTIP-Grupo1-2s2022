const arraySum = (array, keyToSum) => {
    return array.reduce((partialSum, e) => partialSum + e[keyToSum], 0)
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const todayStringFormatted = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}

export {arraySum, capitalize, todayStringFormatted}
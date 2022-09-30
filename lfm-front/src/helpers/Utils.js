const arraySum = (array, keyToSum) => {
    return array.reduce((partialSum, e) => partialSum + e[keyToSum], 0)
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const todayStringFormatted = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}

const firstDayOfMonthStringFormatted = () => {
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-01`
}

const getMonthStringFormatted = (stringDate) => {
    let date = getDateFromString(stringDate);
    let mm = String(date.toLocaleString('default', { month: 'long' }));
    let yyyy = date.getFullYear();
    return `${mm} - ${yyyy}`
}

const getDateFromString = (stringDate) => {
    return new Date(Date.parse(stringDate))
}

export {arraySum, capitalize, todayStringFormatted, firstDayOfMonthStringFormatted, getDateFromString, getMonthStringFormatted}
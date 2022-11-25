import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Filler
} from 'chart.js';

export default class Utils {
    static arraySum = (array, keyToSum) => {
        return array.reduce((partialSum, e) => partialSum + e[keyToSum], 0)
    }

    static capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    static todayStringFormatted = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`
    }

    static firstDayOfMonthStringFormatted = () => {
        let today = new Date();
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        return `${yyyy}-${mm}-01`
    }

    static getMonthStringFormatted = (stringDate) => {
        let date = Utils.getDateFromString(stringDate);
        let mm = String(date.toLocaleString('default', { month: 'long' }));
        let yyyy = date.getFullYear();
        return `${mm} - ${yyyy}`
    }

    static getDateFromString = (stringDate) => {
        return new Date(Date.parse(stringDate))
    }

    static validateEmail = (email, callbackSetterError) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || email.length === 0) {
            callbackSetterError("El campo no puede estar vacío")
            return false
        }
        if (!re.test(String(email).toLowerCase())) {
            callbackSetterError("El formato del email es incorrecto")
            return false
        }
        callbackSetterError("")
        return true
    }

    static validateNotEmpty = (str, callbackSetterError) => {
        if (!str || str.length === 0) {
            callbackSetterError("El campo no puede estar vacío")
            return false
        }
        return true
    }

    static removeFutureValues = (arr) => {
        return arr.filter((a) => (Date.parse(a.fecha) <= Date.now()))
    }

    static formatToCurrentMonth = (arr) => {
        const newArr = []
        const stringToday = Utils.firstDayOfMonthStringFormatted()
        const firstDayOfMonth = Date.parse(stringToday)
        arr.forEach( e => {
            const isPreviousToFirstDay = Date.parse(e.fecha) <=firstDayOfMonth
            if (isPreviousToFirstDay) {
                newArr[stringToday] = newArr[stringToday] ? newArr[stringToday] + e.monto : e.monto
            } else {
                newArr[e.fecha] = newArr[e.fecha] ? newArr[e.fecha] + e.monto : e.monto
            }
        })
        return newArr
    }

    static registerChartJs = () => {
        Chart.register(
            ArcElement,
            BarElement,
            CategoryScale,
            Legend,
            LineElement,
            LinearScale,
            PointElement,
            Title,
            Tooltip,
            Filler
        );
    };
}
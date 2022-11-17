import TelegramBot from 'node-telegram-bot-api'
import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const token = process.env.TELEGRAM_TOKEN;
const baseApiPath = process.env.BASE_API_PATH;
const bot = new TelegramBot(token, {polling: true});

let lastMessage = "";
let currentStrategy = null;
const strategy = {
    gasto: {
        path: `${baseApiPath}/users/1/gastos`,
        successMsg: 'Gasto guardado!',
        errorMsg: 'No pudimos guardar tu gasto :(',
        titleMsg: 'Vamos a registrar un gasto',
        exampleMsg: 'Zapatillas - 3000'
    },
    ingreso: {
        path: `${baseApiPath}/users/1/ingresos`,
        successMsg: 'Ingreso guardado!',
        errorMsg: 'No pudimos guardar tu ingreso :(',
        titleMsg: 'Vamos a registrar un ingreso',
        exampleMsg: 'Sueldo - 10000'
    }
}
const comandosDisponibles = ['/gasto', '/ingreso', '/dolares', '/start']

const get = (path) => {
    return axios({
        method: 'get',
        url: path
    }).then(response => response.data);
}

const post = (path, body) => {
    return axios({
        method: 'post',
        url: path,
        data: {
            ...body
        }
    })
}

const todayStringFormatted = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}

const getMessage = () => {
    return `
<b><u>${currentStrategy.titleMsg}</u></b> ${"\u{1F4B0}"}
Te pido que ingreses los datos de la siguiente manera:
Descripción - Monto
Por ejemplo: ${currentStrategy.exampleMsg}`
}

const retryMessage = () => {
    return `
Te olvidaste de enviar el comando? ${"\u{1F914}"}
Si pasan más de 30 segundos, tendrás que enviar el comando nuevamente`
}

const formatCotizaciones = (blue, mep, turista) => {
    return `
${"\u{1F4B0}"} <b><u>Cotizaciones del dolar</u></b> ${"\u{1F4B0}"}
${"\u{1F4B2}"} <b>Dolar Blue: </b> $${blue}
${"\u{1F4B2}"} <b>Dolar Bolsa: </b> $${mep}
${"\u{1F4B2}"} <b>Dolar Turista: </b> $${turista}`
}

const runStrategyTimeout = () => {
    setTimeout(() => {
        currentStrategy = null
    }, 30000)
}

bot.onText(/^\/start/, function(msg){
    lastMessage = "";
    let chatId = msg.chat.id;
    let nameUser = msg.from.first_name;

    bot.sendMessage(chatId, `Bienvenido ${nameUser}!!`);
});

bot.onText(/^\/dolares/, async function(msg){
    lastMessage = "";
    const result = await get(`${baseApiPath}/cotizacionDolares`);
    const [blue, mep, turista] = result
    await bot.sendMessage(msg.chat.id, formatCotizaciones(blue.venta, mep.venta, turista.venta), {parse_mode: "HTML"});
});

bot.onText(/^\/gasto/, async function(msg){
    lastMessage = msg.text;
    currentStrategy = strategy.gasto
    runStrategyTimeout()
    await bot.sendMessage(msg.chat.id, getMessage(), {parse_mode: "HTML"});
});

bot.onText(/^\/ingreso/, async function(msg){
    lastMessage = msg.text;
    currentStrategy = strategy.ingreso
    runStrategyTimeout()
    await bot.sendMessage(msg.chat.id, getMessage(), {parse_mode: "HTML"});
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (currentStrategy) {
        const [descripcion, monto] = msg.text.split('-').map(element => element.trim());
        post(currentStrategy.path, {
            descripcion: descripcion,
            monto: monto,
            periodicidad: "MENSUAL",
            duracion: 1,
            fecha: todayStringFormatted()
        })
        .then(() => bot.sendMessage(chatId, currentStrategy.successMsg))
        .catch(() => bot.sendMessage(chatId, currentStrategy.errorMsg))
        .finally(() => currentStrategy = null)
    }
    if (!comandosDisponibles.includes(msg.text) && !comandosDisponibles.includes(lastMessage)  ){
        bot.sendMessage(chatId, retryMessage())
    }
    lastMessage = msg.text;
});

bot.on('polling_error', function(error){
    console.log(error);
});
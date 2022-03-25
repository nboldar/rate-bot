import dotenv from 'dotenv';
import {Telegraf} from 'telegraf';
import config from './config.mjs';
import cbrfData from "./cbrfData.mjs";
import binanceData from "./binanceData";

dotenv.config()

const bot = new Telegraf(process.env.T_TOKEN)
bot.start((ctx) => {
    ctx.reply('Введите обозначение валюты в международном формате - USD, EUR, CAD и др.')
})
bot.help((ctx) => ctx.reply('Бот при запросе выдает курсы валют ЦБ РФ \n и курсы криптовалют с binance.us. Для старта \/start '));

bot.on('text', async (ctx) => {
    const data = await cbrfData(config.cbrfRateUrl);
    const keys = Object.keys(data);
    const text = ctx.message.text.toUpperCase();
    if (keys.includes(text)) {
        ctx.reply(`На ${data.date} \n за 1 ${text} ${data[text]} руб ЦБ РФ`)
    } else {
        ctx.reply('Нет такой валюты.\n Введите обозначение валюты в международном формате - USD, EUR, CAD и др.')
    }
})
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

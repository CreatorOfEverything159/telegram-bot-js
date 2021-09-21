require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})

bot.on('message', async msg => {

    const messageID = msg.message_id

    const userID = msg.from.id
    const isBot = msg.from.is_bot
    const userFirstName = msg.from.first_name
    const userName = msg.from.username

    const languageCode = msg.from.language_code

    const chatID = msg.chat.id
    const chatType = msg.chat.type

    const date = msg.date

    const text = msg.text

    await bot.sendMessage(chatID, text)

})

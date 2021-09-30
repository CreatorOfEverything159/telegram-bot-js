require('dotenv').config()
const consts = require('./const')
const TelegramBot = require('node-telegram-bot-api')

bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})

bot.on('message', msg => {

    console.log(msg)

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

    if (text === consts.banCommand+'@MyTestFeatureBot') {
        bot.restrictChatMember(chatID, msg.reply_to_message.from.id, {
            can_send_messages: false,
            can_send_media_messages: false,
            can_send_polls: false,
            can_send_other_messages: false,
            can_add_web_page_previews: false,
            can_change_info: false,
            can_invite_users: false,
            can_pin_messages: false,
            until_date: Date.now()/1000 + 60
        })
    }

})

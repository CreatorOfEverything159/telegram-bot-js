require('dotenv').config()
const consts = require('./consts')
const botCommands = require('./commands')
const TelegramBot = require('node-telegram-bot-api')

bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})

bot.setMyCommands(botCommands.commands)

bot.on('message', async msg => {

    console.log(msg)

    const userID = msg.from.id
    const userName = msg.from.username
    const chatID = msg.chat.id
    const text = msg.text

    if (text === consts.banCommand + consts.botName) {
        let banningPersonID = msg.reply_to_message.from.id
        let banningPersonName = msg.reply_to_message.from.username
        let random = Math.floor(Math.random() * 2)
        let banTime = 60

        let status = await bot.getChatMember(chatID, userID).then(res => {
            return res.status
        })
        let banningPerson = await bot.getChatMember(chatID, msg.reply_to_message.from.id).then(res => {
            return res.status
        })

        if ((status === 'member' || status === 'restricted')
            && (banningPerson === 'creator' || banningPerson === 'admin')) {
            banningPersonID = userID
            banningPersonName = userName
            banTime = 300
        } else if (random === 1 && (status === 'member' || status === 'restricted')) {
            banningPersonID = userID
            banningPersonName = userName
        }

        await bot.restrictChatMember(chatID, banningPersonID, {
            can_send_messages: false,
            can_send_media_messages: false,
            can_send_polls: false,
            can_send_other_messages: false,
            can_add_web_page_previews: false,
            can_change_info: false,
            can_invite_users: false,
            can_pin_messages: false,
            until_date: Date.now() / 1000 + banTime
        })

        await bot.sendMessage(chatID, `Забанен: @${banningPersonName} на ${banTime}сек`)
    }

    if (text.includes(`${consts.adminBanCommand + consts.botName}`)) {
        let banTime = +text.split(' ')[1]
        console.log(banTime)

        let banningPersonID = msg.reply_to_message.from.id
        let banningPersonName = msg.reply_to_message.from.username
        let status = await bot.getChatMember(chatID, userID).then(res => {
            return res.status
        })

        if (status === 'admin' || status === 'creator') {
            await bot.restrictChatMember(chatID, banningPersonID, {
                can_send_messages: false,
                can_send_media_messages: false,
                can_send_polls: false,
                can_send_other_messages: false,
                can_add_web_page_previews: false,
                can_change_info: false,
                can_invite_users: false,
                can_pin_messages: false,
                until_date: Date.now() / 1000 + (60 * banTime)
            })

            await bot.sendMessage(chatID, `Забанен: @${banningPersonName} на ${banTime}мин от имени админа`)
        } else {
            await bot.sendMessage(chatID, `Не забанен по причине: банил лох`)
        }
    }

})

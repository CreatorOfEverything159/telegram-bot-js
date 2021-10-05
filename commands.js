const consts = require('./consts')

module.exports = {
    commands: [
        {command: consts.banCommand, description: 'Забанить на минутку'},
        {command: consts.adminBanCommand, description: 'Забанить от имени админа'},
        {command: consts.unBanCommand, description: 'Разбанить'},
    ]
}

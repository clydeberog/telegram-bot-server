require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
})
const responses = {
  personal:
    'Find the 🅑🅔🅢🅣 🅟🅔🅡🅢🅞🅝🅐🅛 🅛🅞🅐🅝🅢 🅢🅘🅝🅖🅐🅟🅞🅡🅔 Has to Offer Right Here : https://gordonh40.sg-host.com/',

  short_term:
    'Bridge Your Financial Gap with Our 🅢🅗🅞🅡🅣 🅣🅔🅡🅜 🅛🅞🅐🅝 Solutions : https://gordonh40.sg-host.com/',

  contact_us:
    'Contact with us now : https://gordonh40.sg-host.com/'
}
function mainMenu() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: '💰 Personal', callback_data: 'personal' }],
        [{ text: '⏳ Short Term', callback_data: 'short_term' }],
        [{ text: '📝 Contact Us', callback_data: 'contact_us' }],
        [{ text: 'ℹ️ Help', callback_data: 'help' }]
      ]
    }
  }
}
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `👋 Welcome to NextStep SG!

Silakan pilih kebutuhan Anda di bawah ini:`,
    mainMenu()
  )
    console.log('onText /start from', msg.chat && msg.chat.id, msg.from && msg.from.username)
})

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'Silakan pilih salah satu opsi:',
    mainMenu()
  )
})

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id
  const action = query.data
    console.log('callback_query', { chatId, action })

  if (action === 'help') {
    bot.sendMessage(chatId, 'Main Menu', mainMenu())
  } else if (responses[action]) {
    bot.sendMessage(chatId, responses[action], {
      reply_markup: {
        inline_keyboard: [
          [{ text: '⬅️ Back to Menu', callback_data: 'help' }]
        ]
      }
    })
  }

  bot.answerCallbackQuery(query.id)
})

bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
      console.log('message', { id: msg.message_id, from: msg.from && msg.from.username, text: msg.text })
    bot.sendMessage(
      msg.chat.id,
      'Please choose one of the menu below:',
      mainMenu()
    )
  }
})


console.log('🤖 Telegram bot running with polling...')


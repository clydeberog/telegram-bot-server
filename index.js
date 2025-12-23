require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
})
const responses = {
  personal_loan:
    'Find the Best Personal L04NS Singapore Has to Offer Right Here:\nhttps://gordonh40.sg-host.com/personal-loan/',

  fast_personal_loan:
    'Need a Fast Approval Personal L04N? First Read Me Here:\nhttps://gordonh40.sg-host.com/fast-personal-loan/',

  short_term_loan:
    'Bridge Your Financial Gap with Our Short Term L04N Solutions:\nhttps://gordonh40.sg-host.com/short-term-loan/',

  get_a_loan:
    'Apply Now for A L04N:\nhttps://gordonh40.sg-host.com/get-a-loan/'
}
function mainMenu() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: '💰 Personal L04N', callback_data: 'personal_loan' }],
        [{ text: '⚡ Fast Personal L04N', callback_data: 'fast_personal_loan' }],
        [{ text: '⏳ Short Term L04N', callback_data: 'short_term_loan' }],
        [{ text: '📝 Apply L04N Now', callback_data: 'get_a_loan' }],
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


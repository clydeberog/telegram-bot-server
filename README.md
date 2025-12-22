Added logging in the /start handler: console.log('onText /start from', msg.chat && msg.chat.id, msg.from && msg.from.username)
Added logging at start of the callback_query handler: console.log('callback_query', { chatId, action })
Added logging in the message handler: console.log('message', { id: msg.message_id, from: msg.from && msg.from.username, text: msg.text })

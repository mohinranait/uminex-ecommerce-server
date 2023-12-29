const { addMessage, getMessages } = require('../controllers/MessageController');

const express = require('express');
const messageRouter = express.Router();

messageRouter.post('/message', addMessage);
messageRouter.get('/message/:chatId', getMessages);

module.exports = messageRouter
const  express = require('express'); 
const { createChat, userChats, findChat } = require('../controllers/ChatController');

const chatRouter = express.Router()

chatRouter.post('/chat', createChat);
chatRouter.get('/chat/:userId', userChats);
chatRouter.get('/chat/find/:firstId/:secondId', findChat);

module.exports= chatRouter
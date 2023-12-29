const ChatModel = require("../models/ChatModel");


const createChat = async (req, res) => {

    const senderId = req.body?.senderId;
    const receiverId = req.body?.receiverId;
    const query = {
        members : {
            $all : [senderId, receiverId]
        }
    }
    const isExists = await ChatModel.findOne(query);
    if(isExists){
        return res.send(isExists)
    }
    
    const newChat = new ChatModel({
        members: [senderId, receiverId],
    });
    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const userChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

const findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
};


module.exports = {
    createChat, 
    userChats,
    findChat
}
const {model, Schema} = require("mongoose");

const MessageSchema = new Schema(
    {
        chatId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const MessageModel = model("Message", MessageSchema);
module.exports = MessageModel

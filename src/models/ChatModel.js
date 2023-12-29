const  {model , Schema} = require("mongoose");

const ChatSchema = new Schema(
    {
        members: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);

const ChatModel = model("Chat", ChatSchema);
module.exports =  ChatModel;

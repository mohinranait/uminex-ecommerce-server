const {model, Schema} = require("mongoose")


const bannerSlider = new Schema({
    image : {
        type : String
    },
    title : {
        type : String
    },
    subtitle : {
        type : String
    },
    url : {
        type : String
    },
    button_text : {
        type : String
    },
    button_status : {
        type : Boolean,
        default: true //button status  [true=public, false=hidden]
    },
    status : {
        type : Boolean,
        default: true, // banner status  [true=public, false=hidden]
    },
})


const BannerSlider = model("BannerSlider", bannerSlider);

module.exports = BannerSlider;



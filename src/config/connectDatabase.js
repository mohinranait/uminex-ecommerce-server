const mongoose = require("mongoose");

const { projectProductionStatus, developmentDbUri, databaseUserName, databasePassword } = require("../services/envSecret");



// Database uri configaration setting
const getConnectionString =  () => {
    let uri = developmentDbUri;
    if( projectProductionStatus === 'development' ){
        uri = uri.replace("<username>", databaseUserName);
        uri = uri.replace("<password>", databasePassword);
    }
    return uri;
}


// Connection mongodb database 
const connectMongoDb = async () => {
    try {
        const mongodbUri = getConnectionString();
        await mongoose.connect(mongodbUri);
        console.log("Mongodb connect successfull");
    } catch (error) {
        console.log(error.message);;
    }
}


module.exports = connectMongoDb


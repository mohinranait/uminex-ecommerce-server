require("dotenv").config();

const databaseUserName = process.env.MONGO_DB_USER;
const databasePassword = process.env.MONGO_DB_PASS;
const localDbUri = process.env.DATABASE_LOCAL;
const projectProductionStatus = process.env.PROJECT_NODE;
const developmentDbUri = process.env.DATABASE_LOCAL;
const serverPort  = process.env.SERVER_PORT;
const jwtSecret = process.env.JWT_SECRET;
const productionMode = process.env.NODE_ENV;

module.exports = {
    databaseUserName,
    databasePassword,
    localDbUri,
    projectProductionStatus,
    developmentDbUri,
    serverPort,
    jwtSecret,
    productionMode
}
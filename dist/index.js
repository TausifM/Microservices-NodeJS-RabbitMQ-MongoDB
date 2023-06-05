"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const configFile = `./.env.${process.env.NODE_ENV}`;
dotenv_1.default.config({ path: configFile });
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: "ONLINE_SHOPPING",
    USER_BINDING_KEY: "USER_SERVICE",
    QUEUE_NAME: "USER_QUEUE",
};

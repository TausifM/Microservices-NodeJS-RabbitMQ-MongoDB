"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeToMessage = exports.CreateChannel = exports.FormateData = exports.ValidateSignature = exports.GenerateSignature = exports.ValidatePassword = exports.GeneratePassword = exports.GenerateSalt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const amqplib_1 = require("amqplib");
const { APP_SECRET, EXCHANGE_NAME, MESSAGE_BROKER_URL, QUEUE_NAME, USER_BINDING_KEY, } = require("../config");
//Utility functions
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.genSalt();
});
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.GeneratePassword = GeneratePassword;
// Validate Password
const ValidatePassword = (enteredPassword, savedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.GeneratePassword)(enteredPassword, salt)) === savedPassword;
});
exports.ValidatePassword = ValidatePassword;
const GenerateSignature = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jsonwebtoken_1.default.sign(payload, APP_SECRET, { expiresIn: "2h" });
});
exports.GenerateSignature = GenerateSignature;
const ValidateSignature = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.get("Authorization");
    if (signature) {
        try {
            const token = signature.split(" ")[1];
            const payload = yield jsonwebtoken_1.default.verify(token, APP_SECRET);
            req.user = payload;
            return true;
        }
        catch (error) {
            // Handle verification error
            return false;
        }
    }
    return false;
});
exports.ValidateSignature = ValidateSignature;
const FormateData = (data) => {
    if (data) {
        return { data };
    }
    else {
        throw new Error("Data Not found!");
    }
};
exports.FormateData = FormateData;
/*----------------Message broker configs-----------*/
// Create a channel
const CreateChannel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, amqplib_1.connect)(MESSAGE_BROKER_URL);
        const channel = yield connection.createChannel();
        yield channel.assertExchange(EXCHANGE_NAME, "direct", { durable: false });
        return channel;
    }
    catch (error) {
        throw error;
    }
});
exports.CreateChannel = CreateChannel;
// Subscribe to message broker
const SubscribeToMessage = (channel, service) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appQueue = yield channel.assertQueue(QUEUE_NAME);
        yield channel.bindQueue(appQueue.queue, EXCHANGE_NAME, USER_BINDING_KEY);
        yield channel.consume(appQueue.queue, (data) => {
            console.log("---received data in user service-----");
            console.log(data === null || data === void 0 ? void 0 : data.content.toString());
            service.SubscribeEvents(data === null || data === void 0 ? void 0 : data.content.toString());
            if (data !== null)
                return channel.ack(data);
        });
    }
    catch (error) {
        throw error;
    }
});
exports.SubscribeToMessage = SubscribeToMessage;

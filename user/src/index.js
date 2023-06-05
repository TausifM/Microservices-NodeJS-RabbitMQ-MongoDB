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
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const utils_1 = require("./utils");
const express_app_1 = require("./express-app");
const connection_1 = __importDefault(require("./database/connection"));
const port = config_1.CONFIG.PORT;
const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    yield (0, connection_1.default)();
    const channel = yield (0, utils_1.CreateChannel)();
    yield (0, express_app_1.expressApp)(app, channel);
    app.get('/', (req, res) => {
        res.send('Express + TypeScript Server');
    });
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    app.listen(config_1.CONFIG.PORT, () => {
        console.log(`listening to port ${config_1.CONFIG.PORT}`);
    })
        .on("error", (err) => {
        console.log(err);
        process.exit();
    });
});
StartServer();

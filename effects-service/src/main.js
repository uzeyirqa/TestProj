"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const log4js_1 = __importDefault(require("log4js"));
const log4js_json_layout_1 = __importDefault(require("log4js-json-layout"));
const service_1 = __importDefault(require("./service"));
const controller_1 = __importDefault(require("./controller"));
log4js_1.default.addLayout('json', log4js_json_layout_1.default);
log4js_1.default.configure(config_1.default.get('Logger'));
const logger = log4js_1.default.getLogger('main');
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.post('/v1/effect', controller_1.default.addEffect);
Promise.all([
    service_1.default.init()
]).then(() => {
    app.listen(config_1.default.get('Port'));
    logger.info(`EffectService is up and running`);
}).catch((e) => {
    logger.error(`Initialization of EffectService failed, existing. Error: ${e}`);
    process.exit();
});
process.on('unhandledRejection', (reason, promise) => {
    logger.fatal(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    process.exit();
}).on('uncaughtException', (err, origin) => {
    logger.fatal(`Uncaught Exception ${err} at origin ${origin}`);
    process.exit();
});
//# sourceMappingURL=main.js.map
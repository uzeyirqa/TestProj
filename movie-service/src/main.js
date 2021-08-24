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
app.get('/v1/videos/:Id?', controller_1.default.getVideo);
app.post('/v1/videos', controller_1.default.addVideo);
app.put('/v1/videos', controller_1.default.updateVideo);
app.delete('/v1/videos/:Id', controller_1.default.deleteVideo);
app.post('/v1/effect', controller_1.default.addEffect);
app.get('/v1/actors/:Id?', controller_1.default.getActor);
app.post('/v1/actors', controller_1.default.addActor);
app.put('/v1/actors', controller_1.default.updateActor);
app.delete('/v1/actors', controller_1.default.deleteActor);
Promise.all([
    service_1.default.init()
]).then(() => {
    app.listen(config_1.default.get('Port'));
    logger.info(`MovieService is up and running`);
}).catch((e) => {
    logger.error(`Initialization of MovieService failed, existing. Error: ${e}`);
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
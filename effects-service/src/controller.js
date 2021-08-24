"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const service_1 = __importDefault(require("./service"));
class EffectController {
    constructor() {
        this.logger = log4js_1.default.getLogger(this.constructor.name);
        this.addEffect = async (req, res) => {
            try {
                await service_1.default.addEffect(req.body);
                res.status(200).send();
            }
            catch (e) {
                this.logger.error(`Failed to add effect to video ${req.body.VideoId} `);
                this.logger.error(e);
                res.status(500).send();
            }
        };
    }
}
const effectController = new EffectController();
exports.default = effectController;
//# sourceMappingURL=controller.js.map
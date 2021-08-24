"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const mongodb_1 = require("mongodb");
class EffectService {
    constructor() {
        this.init = async () => {
            this.mongoClient = await mongodb_1.MongoClient.connect(config_1.default.get('db.url'));
            const db = this.mongoClient.db('Cinema');
            this.videosCollection = db.collection('Videos');
        };
        this.addEffect = async (effectObject) => {
            const exists = await this.videosCollection.findOne({ Id: effectObject.VideoId });
            if (!exists) {
                throw new Error(`Video ${effectObject.VideoId} does not exist`);
            }
            const res = await this.videosCollection.updateOne({ Id: effectObject.VideoId }, { $set: { Effect: effectObject.Effect } });
            if (!res.matchedCount) {
                throw new Error(`Could not add effct ${effectObject.Effect} to video with Id ${effectObject.VideoId} `);
            }
        };
    }
}
const effectService = new EffectService();
exports.default = effectService;
//# sourceMappingURL=service.js.map
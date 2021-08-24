"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const Actor_1 = __importDefault(require("./entities/Actor"));
const Video_1 = __importDefault(require("./entities/Video"));
class MovieService {
    constructor() {
        this.init = async () => {
            this.mongoClient = await mongodb_1.MongoClient.connect(config_1.default.get('db.url'), { useUnifiedTopology: true });
            const db = this.mongoClient.db('Cinema');
            this.videosCollection = db.collection('Videos');
            this.actorsCollection = db.collection('Actors');
        };
        this.getVideo = async (id) => {
            let query;
            id ? query = { Id: id } : query = {};
            const result = await this.videosCollection.find(query, { maxTimeMS: 2000, timeout: true });
            if (result) {
                const array = await result.toArray();
                for (const video of array) {
                    delete video['_id'];
                }
                return array;
            }
            else {
                return [];
            }
        };
        this.addVideo = async (newVideo) => {
            newVideo.Id = uuid_1.v4();
            const restrictedVideo = Object.assign(new Video_1.default(newVideo));
            const res = await this.videosCollection.insertOne(restrictedVideo);
            if (!res.insertedCount) {
                throw new Error(`Could not insert video with Id ${restrictedVideo.Id} `);
            }
            delete restrictedVideo['_id'];
            return restrictedVideo;
        };
        this.updateVideo = async (updatedVideo) => {
            const restrictedVideo = Object.assign(new Video_1.default(updatedVideo));
            const res = await this.videosCollection.updateOne({ Id: restrictedVideo.Id }, { $set: restrictedVideo });
            if (!res.matchedCount) {
                throw new Error(`Could not update video with Id ${updatedVideo.Id} `);
            }
            delete restrictedVideo['_id'];
            return restrictedVideo;
        };
        this.deleteVideo = async (id) => {
            const res = await this.videosCollection.deleteOne({ Id: id });
            if (!res.deletedCount) {
                throw new Error(`Could not delete video with Id ${id} `);
            }
        };
        this.addEffect = async (videoId, effect) => {
            await axios_1.default.post(config_1.default.get('effects-url'), { VideoId: videoId, Effect: effect });
        };
        this.getActor = async (id) => {
            let query;
            id ? query = { Id: id } : query = {};
            const result = await this.actorsCollection.find(query, { maxTimeMS: 2000, timeout: true });
            if (result) {
                const array = await result.toArray();
                for (const actor of array) {
                    delete actor['_id'];
                }
                return array;
            }
            else {
                return [];
            }
        };
        this.addActor = async (newActor) => {
            newActor.Id = uuid_1.v4();
            const restrictedActor = Object.assign(new Actor_1.default(newActor));
            const res = await this.actorsCollection.insertOne(restrictedActor);
            if (!res.insertedCount) {
                throw new Error(`Could not insert actor with Id ${restrictedActor.Id} `);
            }
            delete restrictedActor['_id'];
            return restrictedActor;
        };
        this.updateActor = async (updatedActor) => {
            const restrictedActor = Object.assign(new Actor_1.default(updatedActor));
            const res = await this.actorsCollection.updateOne({ Id: restrictedActor.Id }, { $set: restrictedActor });
            if (!res.matchedCount) {
                throw new Error(`Could not update actor with Id ${restrictedActor.Id} `);
            }
            delete restrictedActor['_id'];
            return restrictedActor;
        };
        this.deleteActor = async (id) => {
            const res = await this.actorsCollection.deleteOne({ Id: id });
            if (!res.deletedCount) {
                throw new Error(`Could not delete actor with Id ${id} `);
            }
        };
    }
}
const movieService = new MovieService();
exports.default = movieService;
//# sourceMappingURL=service.js.map
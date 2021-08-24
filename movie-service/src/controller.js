"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const service_1 = __importDefault(require("./service"));
class MovieController {
    constructor() {
        this.logger = log4js_1.default.getLogger(this.constructor.name);
        this.getVideo = async (req, res) => {
            try {
                const result = await service_1.default.getVideo(req.params.Id);
                res.status(200).send(result);
            }
            catch (e) {
                this.logger.error(e);
                res.status(500).send();
            }
        };
        this.addVideo = async (req, res) => {
            try {
                const video = await service_1.default.addVideo(req.body);
                res.status(200).send(video);
            }
            catch (e) {
                this.logger.error(e);
                res.status(500).send();
            }
        };
        this.updateVideo = async (req, res) => {
            try {
                const updatedVideo = await service_1.default.updateVideo(req.body);
                res.status(200).send(updatedVideo);
            }
            catch (e) {
                this.logger.error(e);
                res.status(500).send();
            }
        };
        this.deleteVideo = async (req, res) => {
            try {
                await service_1.default.deleteVideo(req.params.Id);
                res.status(200).send();
            }
            catch (e) {
                this.logger.error(e);
                res.status(500).send();
            }
        };
        this.addEffect = async (req, res) => {
            try {
                await service_1.default.addEffect(req.body.Id, req.body.Effect);
                res.status(200).send();
            }
            catch (e) {
                this.logger.error(`Failed to add effect to video ${req.body.Id} `);
                this.logger.error(e);
                res.status(500).send();
            }
        };
        this.getActor = async (req, res) => {
            try {
                const result = await service_1.default.getActor(req.params.Id);
                res.status(200).send(result);
            }
            catch (e) {
                this.logger.error(e);
                res.status(500).send();
            }
        };
        this.addActor = async (req, res) => {
            try {
                const newActor = await service_1.default.addActor(req.body);
                res.status(200).send(newActor);
            }
            catch (e) {
                this.logger.error(e);
                res.status(500).send();
            }
        };
        this.updateActor = async (req, res) => {
            try {
                const updatedActor = await service_1.default.updateActor(req.body);
                res.status(200).send(updatedActor);
            }
            catch (e) {
                this.logger.error(e);
                res.status(500).send();
            }
        };
        this.deleteActor = async (req, res) => {
            try {
                await service_1.default.deleteActor(req.params.Id);
                res.status(200).send();
            }
            catch (e) {
                this.logger.error(e);
                res.status(500).send();
            }
        };
    }
}
const movieController = new MovieController();
exports.default = movieController;
//# sourceMappingURL=controller.js.map
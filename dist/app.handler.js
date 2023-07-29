"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppHandler = void 0;
const common_1 = require("@nestjs/common");
const nestjs_sqs_1 = require("@ssut/nestjs-sqs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let AppHandler = class AppHandler {
    async handleMessage(message) {
        console.log(new Date(), message.length);
    }
    onProcessingError(error, message) {
        console.log("onProcessingError", error, message);
    }
};
__decorate([
    (0, nestjs_sqs_1.SqsMessageHandler)(process.env.QUEUE_NAME, true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AppHandler.prototype, "handleMessage", null);
__decorate([
    (0, nestjs_sqs_1.SqsConsumerEventHandler)(process.env.QUEUE_NAME, 'processing_error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Error, Object]),
    __metadata("design:returntype", void 0)
], AppHandler.prototype, "onProcessingError", null);
AppHandler = __decorate([
    (0, common_1.Injectable)()
], AppHandler);
exports.AppHandler = AppHandler;
//# sourceMappingURL=app.handler.js.map
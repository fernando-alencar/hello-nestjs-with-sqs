"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_sqs_1 = require("@ssut/nestjs-sqs");
const AWS = require("aws-sdk");
const dotenv_1 = require("dotenv");
const app_controller_1 = require("./app.controller");
const app_handler_1 = require("./app.handler");
const app_service_1 = require("./app.service");
(0, dotenv_1.config)();
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_sqs_1.SqsModule.registerAsync({
                useFactory: () => {
                    return {
                        consumers: [
                            {
                                name: process.env.QUEUE_NAME,
                                queueUrl: process.env.QUEUE_URL,
                                region: process.env.AWS_REGION,
                                batchSize: 10,
                                pollingWaitTimeMs: 1,
                            },
                        ],
                        producers: [
                            {
                                name: process.env.QUEUE_NAME,
                                queueUrl: process.env.QUEUE_URL,
                                region: process.env.AWS_REGION,
                            },
                        ],
                    };
                },
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_handler_1.AppHandler],
        exports: [app_handler_1.AppHandler]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
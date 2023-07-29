import { SqsService } from '@ssut/nestjs-sqs';
export declare class AppService {
    private readonly sqsService;
    constructor(sqsService: SqsService);
    execute(): Promise<void>;
}

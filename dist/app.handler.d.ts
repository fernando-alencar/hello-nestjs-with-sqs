import { Message } from '@aws-sdk/client-sqs';
export declare class AppHandler {
    handleMessage(message: Message[]): Promise<void>;
    onProcessingError(error: Error, message: Message): void;
}

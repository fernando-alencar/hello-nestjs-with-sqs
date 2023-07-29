import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { config } from 'dotenv';

config()

@Injectable()
export class AppHandler {
  @SqsMessageHandler(process.env.QUEUE_NAME, true)
  public async handleMessage(message: Message[]) {
    // console.time('time')
    // console.log("handleMessage", message)
    // console.timeEnd('time')
    console.log(new Date(), message.length)
  }

  @SqsConsumerEventHandler(process.env.QUEUE_NAME, 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    console.log("onProcessingError", error, message)
  }
} 
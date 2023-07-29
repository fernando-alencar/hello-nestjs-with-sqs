import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppHandler } from './app.handler';
import { AppService } from './app.service';

config()

AWS.config.update({
  region: process.env.AWS_REGION, // aws region
  accessKeyId: process.env.ACCESS_KEY_ID, // aws access key id
  secretAccessKey: process.env.SECRET_ACCESS_KEY, // aws secret access key
});

@Module({
  imports: [
    SqsModule.registerAsync({
      useFactory: () => {
        return {
          consumers: [
            {
              name: process.env.QUEUE_NAME, // name of the queue 
              queueUrl: process.env.QUEUE_URL, // the url of the queue
              region: process.env.AWS_REGION,
              batchSize: 10,
              pollingWaitTimeMs: 1,
            },
          ],
          producers: [
            {
              name: process.env.QUEUE_NAME, // name of the queue
              queueUrl: process.env.QUEUE_URL,
              region: process.env.AWS_REGION, // url of the queue
            },
          ],
        };
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppHandler],
  exports: [AppHandler]
})
export class AppModule {}

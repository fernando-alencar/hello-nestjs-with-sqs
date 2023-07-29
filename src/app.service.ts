import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { config } from 'dotenv';

config()

@Injectable()
export class AppService {
  public constructor(
    private readonly sqsService: SqsService,
  ) {

    setInterval(() => {
      this.execute()
      console.log('1 segundo')
    }, 1000);

    //Taxa de envio, criado 40k em 1 minuto, 
    //Melhor desempenho para recebimento ficou de 30 por segundo em modo batch de 10, que é uma taxa muita baixa

  }


  async execute() {
    await this.sqsService.send(process.env.QUEUE_NAME, {
      id: 'ID',
      body: {
        foo: 'bar'
      },
      // groupId: 'groupId', // for FIFO queue
      // deduplicationId: 'deduplicationId', // for FIFO queue
      messageAttributes: {
        hello: { StringValue: 'world', DataType: 'String' }
      },
      // delaySeconds: 0,
    });
  }
}





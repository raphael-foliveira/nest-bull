import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import type { Queue } from 'bull';
import type { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  logger = new Logger(TransactionsService.name);

  constructor(
    @InjectQueue('transactions')
    private queue: Queue
  ) {}

  async create(dto: CreateTransactionDto) {
    const { id, data } = await this.queue.add(dto, {
      jobId: dto.userId,
      removeOnComplete: 10000,
      removeOnFail: 10000,
    });
    let isActive = true;
    let returnValue: any;
    while (isActive) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const job = await this.queue.getJob(id);
      if (!job) {
        throw new Error('Job not found');
      }
      returnValue = job.returnvalue;
      isActive = await job.isActive();
    }
    return { id, data, returnValue };
  }
}

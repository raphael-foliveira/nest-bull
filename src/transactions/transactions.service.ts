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
      removeOnComplete: true,
    });
    return { id, data };
  }
}

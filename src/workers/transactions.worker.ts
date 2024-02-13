import { Process, Processor } from '@nestjs/bull';
import { ConflictException, Inject, Logger } from '@nestjs/common';
import type { Job } from 'bull';
import type { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';

@Processor('transactions')
export class TransactionsWorker {
  logger = new Logger(TransactionsWorker.name);

  constructor(
    @Inject(TransactionsRepository)
    private repository: TransactionsRepository
  ) {}

  @Process()
  async process({ data: { userId, amount } }: Job<CreateTransactionDto>) {
    try {
      await this.repository.create({
        user: userId,
        amount,
      });
      return 'ok';
    } catch (err) {
      this.logger.error(err);
      return 'failed';
    }
  }
}

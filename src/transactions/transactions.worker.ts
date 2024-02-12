import { Process, Processor } from '@nestjs/bull';
import { ConflictException, Inject, Logger } from '@nestjs/common';
import type { Job } from 'bull';
import type { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transactions.repository';

@Processor('transactions')
export class TransactionsWorker {
  logger = new Logger(TransactionsWorker.name);

  constructor(
    @Inject(TransactionsRepository)
    private repository: TransactionsRepository
  ) {}

  @Process()
  async process({ id, data }: Job<CreateTransactionDto>) {
    try {
      const existingTransaction = await this.repository.findById(+id.valueOf());
      if (existingTransaction) {
        throw new ConflictException('User has already made a transaction');
      }
      await this.repository.create({
        user: data.userId,
        amount: data.amount,
      });
      return 'ok';
    } catch (err) {
      this.logger.error(err);
      return 'failed';
    }
  }
}

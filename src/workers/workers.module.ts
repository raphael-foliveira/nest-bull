import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { TransactionsWorker } from './transactions.worker';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'transactions' }),
    RepositoryModule,
  ],
  providers: [TransactionsWorker],
})
export class WorkersModule {}

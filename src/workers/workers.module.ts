import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsWorker } from './transactions.worker';
import { TransactionsRepository } from './transactions.repository';
import { SharedModule } from '../shared/shared.module';
import { Transaction } from '../transactions/entities/transaction.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Transaction]),
    BullModule.registerQueue({ name: 'transactions' }),
  ],
  providers: [TransactionsWorker, TransactionsRepository],
})
export class WorkersModule {}

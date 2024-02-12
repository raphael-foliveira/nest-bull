import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsWorker } from './transactions.worker';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionsRepository } from './transactions.repository';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'transactions' }),
    TypeOrmModule.forFeature([Transaction]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsWorker, TransactionsRepository],
})
export class TransactionsModule {}

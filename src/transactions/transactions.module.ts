import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'transactions' })],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}

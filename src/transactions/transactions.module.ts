import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'transactions' }),
    RepositoryModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}

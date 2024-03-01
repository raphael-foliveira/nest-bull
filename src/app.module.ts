import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WorkersModule } from './workers/workers.module';

@Module({
  imports: [WorkersModule, SharedModule, TransactionsModule],
})
export class AppModule {}

import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import type { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  logger = new Logger(TransactionsController.name);

  constructor(
    @Inject(TransactionsService)
    private service: TransactionsService
  ) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.service.create(createTransactionDto);
  }
}

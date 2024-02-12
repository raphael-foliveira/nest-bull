import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>
  ) {}

  create(transaction: Transaction) {
    return this.repository.save(transaction);
  }

  findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }
}

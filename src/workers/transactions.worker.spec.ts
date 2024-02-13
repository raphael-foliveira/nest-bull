import { describe, it, expect, beforeEach, spyOn } from 'bun:test';
import type { TransactionsRepository } from '../repository/transactions.repository';
import { TransactionsWorker } from './transactions.worker';
import type { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import type { Job } from 'bull';
import type { Transaction } from '../transactions/entities/transaction.entity';

describe('TransactionsWorker', () => {
  let transactionsWorker: TransactionsWorker;
  let transactionsRepository: TransactionsRepository;

  beforeEach(() => {
    transactionsRepository = {
      findById: () => {},
      create: () => {},
    } as any;
    transactionsWorker = new TransactionsWorker(transactionsRepository);
  });

  describe('process', () => {
    it('should successfuly save a transaction when it is not already present in the database', async () => {
      spyOn(transactionsRepository, 'findById').mockImplementationOnce(
        async () => null
      );
      const result = await transactionsWorker.process({
        id: 1,
        data: { userId: 1, amount: 100 },
      } as Job<CreateTransactionDto>);
      expect(result).toBe('ok');
    });

    it("should fail to save a transaction when it's already present in the database", async () => {
      spyOn(transactionsRepository, 'findById').mockImplementationOnce(
        async (id: number) =>
          ({
            id,
          }) as Transaction
      );
      const result = await transactionsWorker.process({
        id: 1,
        data: { userId: 1, amount: 100 },
      } as Job<CreateTransactionDto>);
      expect(result).toBe('failed');
    });
  });
});

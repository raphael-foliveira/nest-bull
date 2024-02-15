import type { Job } from 'bull';
import { beforeEach, describe, expect, it, spyOn } from 'bun:test';
import { TransactionsWorker } from './transactions.worker';
import type { TransactionsRepository } from '../repository/transactions.repository';
import type { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';

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
      spyOn(transactionsRepository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });
      const result = await transactionsWorker.process({
        id: 1,
        data: { userId: 1, amount: 100 },
      } as Job<CreateTransactionDto>);
      expect(result).toBe('failed');
    });
  });
});

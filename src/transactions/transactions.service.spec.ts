import { type Queue } from 'bull';
import { beforeEach, describe, expect, it, spyOn } from 'bun:test';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let transactionsQueue: Queue;

  beforeEach(() => {
    transactionsQueue = {
      add: () => {},
    } as any;
    transactionsService = new TransactionsService(transactionsQueue);
  });

  describe('create', () => {
    it('should add a new transaction to the queue and return the return value', async () => {
      spyOn(transactionsQueue, 'add').mockResolvedValueOnce({
        returnvalue: 'ok',
      } as any);

      const result = await transactionsService.create({
        userId: 1,
        amount: 100,
      });

      expect(result.id).toBe(1);
    });
  });
});

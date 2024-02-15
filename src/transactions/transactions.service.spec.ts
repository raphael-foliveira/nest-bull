import { type Queue } from 'bull';
import { beforeEach, describe, expect, it, spyOn } from 'bun:test';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let transactionsQueue: Queue;

  beforeEach(() => {
    transactionsQueue = {
      add: () => {},
      getJob: () => {},
    } as any;
    transactionsService = new TransactionsService(transactionsQueue);
  });

  describe('create', () => {
    it('should add a new transaction to the queue and return the return value', async () => {
      const userId = 1;
      spyOn(transactionsQueue, 'add').mockResolvedValueOnce({
        id: userId,
      } as any);
      spyOn(transactionsQueue, 'getJob').mockResolvedValue(null);

      const result = await transactionsService.create({
        userId,
        amount: 100,
      });

      expect(result.id).toBe(userId);
    });
  });
});

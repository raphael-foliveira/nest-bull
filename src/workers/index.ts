import { NestFactory } from '@nestjs/core';
import { WorkersModule } from './workers.module';
import { Logger } from '@nestjs/common';

const runWorkers = async () => {
  new Logger('runWorkers').log('Starting workers...');
  const app = await NestFactory.create(WorkersModule);
  await app.listen(3001);
};
runWorkers();

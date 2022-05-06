import path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import { getConnection } from 'typeorm';

const fileExists = promisify(fs.exists);
const unlink = promisify(fs.unlink);

global.beforeEach(async () => {
  // Delete database
  const dbPath = path.resolve(__dirname, '..', 'test.sqlite');
  if (await fileExists(dbPath)) await unlink(dbPath);
});

global.afterEach(async () => {
  await getConnection().close();
});

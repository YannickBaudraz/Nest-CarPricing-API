import { deleteDbFile } from './test-helper';

global.beforeAll(async () => {
  deleteDbFile();
});

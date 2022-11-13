import path from 'path';
import fs from 'fs';

export function deleteDbFile() {
  const dbFile = path.join(__dirname, '..', 'test.sqlite');
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
  }
}

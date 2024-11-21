import { writeFile } from 'fs/promises';
import { rmSync, existsSync } from 'fs';
import { MemoryStoredFile } from 'nestjs-form-data';
import { join } from 'path';

export const storeFile = async (file: MemoryStoredFile, name?: string) => {
  const fileName = `${name ?? file.originalName}.${file.extension}`;
  const uploadPath = join(__dirname, '../../../uploads');
  const filePath = join(uploadPath, fileName);

  await writeFile(filePath, file.buffer);

  return `uploads/${fileName}`;
};

export const deleteFile = (path: string) => {
  const filePath = join(__dirname, '../../../', path);
  if (filePath && existsSync(filePath)) {
    rmSync(filePath);
    return true;
  }

  return false;
};

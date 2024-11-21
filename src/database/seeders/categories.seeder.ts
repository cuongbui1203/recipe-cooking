import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { Category } from '@entities/category.entity';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('object');
    await dataSource.query('TRUNCATE table categories');
    await dataSource.query('ALTER TABLE categories AUTO_INCREMENT=1');
    const repository = dataSource.getRepository(Category);

    await repository.insert([
      {
        id: 1,
        name: 'fried',
      },
      {
        id: 2,
        name: 'stew',
      },
      {
        id: 3,
        name: 'soup',
      },
    ]);
  }
}

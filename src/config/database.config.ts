import 'dotenv/config';
import { readFile } from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'test',
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  seeds: [__dirname + '/../database/seeders/*.seeder{.ts,.js}'],
  factories: [__dirname + '/../database/factories/*.factory{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);

export { dataSource };

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UpdateDatabase1732088167836 implements MigrationInterface {
  transaction?: boolean;
  name = 'UpdateDatabase1732088167836';
  tables: Table[] = [
    new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'extension',
          type: 'varchar',
          length: '10',
        },
        {
          name: 'path',
          type: 'varchar',
          length: '255',
        },
      ],
    }),
    new Table({
      name: 'recipes',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_by',
          type: 'bigint',
        },
        {
          name: 'deleted_at',
          type: 'timestamp(6)',
          isNullable: true,
        },
        {
          name: 'title',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'cooking_time',
          type: 'int',
          default: 0,
        },
        {
          name: 'image_id',
          type: 'bigint',
        },
      ],
    }),
    new Table({
      name: 'recipe_steps',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_by',
          type: 'bigint',
        },
        {
          name: 'deleted_at',
          type: 'timestamp(6)',
          isNullable: true,
        },
        {
          name: 'recipe_id',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'image_id',
          type: 'int',
          isNullable: true,
        },
        {
          name: 'description',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
        },
      ],
    }),
    new Table({
      name: 'categories',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
      ],
    }),
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      this.tables.map((table) => queryRunner.createTable(table)),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(this.tables.map((table) => queryRunner.dropTable(table)));
  }
}

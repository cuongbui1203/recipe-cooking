import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDatabase1732074886276 implements MigrationInterface {
  name = 'CreateDatabase1732074886276';
  table = new Table({
    name: 'users',
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
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isUnique: false,
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}

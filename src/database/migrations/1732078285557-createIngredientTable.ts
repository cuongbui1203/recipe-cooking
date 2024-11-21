import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateIngredientTable1732078285557 implements MigrationInterface {
  name = 'CreateIngredientTable1732078285557';
  table = new Table({
    name: 'ingredients',
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
        default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
      },
      {
        name: 'updated_by',
        type: 'bigint',
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
      },
      {
        name: 'description',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'image_id',
        type: 'bigint',
        isNullable: true,
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

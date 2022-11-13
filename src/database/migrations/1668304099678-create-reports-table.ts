import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createReportsTable1668304099678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reports',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'approved',
            type: 'boolean',
            default: false,
          },
          {
            name: 'price',
            type: 'integer',
          },
          {
            name: 'make',
            type: 'varchar',
          },
          {
            name: 'model',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'integer',
          },
          {
            name: 'latitude',
            type: 'integer',
          },
          {
            name: 'longitude',
            type: 'integer',
          },
          {
            name: 'mileage',
            type: 'integer',
          },
          {
            name: 'userId',
            type: 'integer',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'reports',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('reports');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey(table, foreignKey);
    await queryRunner.dropTable(table);
  }
}

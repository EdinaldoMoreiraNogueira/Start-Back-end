import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFildToProviderId1590376082532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>{
      await queryRunner.dropColumn('appointments', 'provider');

      await queryRunner.addColumn(
        'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
       isNullable: true,

      }));
      await queryRunner.createForeignKey('appointments', new TableForeignKey({

      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      name: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'SET NULL',
      }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'users');

      await queryRunner.dropColumn('appointments', 'provider_id');

      await queryRunner.addColumn('appointments', new TableColumn({
        name: "provider",
        type: "varchar"
      }))
    }

}


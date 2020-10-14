import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602594007165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'orphanages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true, // gerada automaticamente
            generationStrategy: 'increment', // auto increment
          },

          {
            name: 'name',
            type: 'varchar'
          },

          {
            name: 'latitude',
            type: 'decimal',
            scale: 10, // depois da virgula
            precision: 2 // antes da virgula
          },
          
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10, // depois da virgula
            precision: 2 // antes da virgula
          },

          {
            name: 'about',
            type: 'text'
          },

          {
            name: 'instructions',
            type: 'text'
          },

          {
            name: 'opening_hours',
            type: 'varchar'
          },

          {
            name: 'open_on_weekends',
            type: 'boolean',
            default: false
          },
        ]
      }))   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('orphanages')
    }

}

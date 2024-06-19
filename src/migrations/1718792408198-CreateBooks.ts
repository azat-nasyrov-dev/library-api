import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBooks1718792408198 implements MigrationInterface {
  name = 'CreateBooks1718792408198';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" ADD "author" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "author"`);
  }
}

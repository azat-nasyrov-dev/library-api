import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsBetweenBooksAndUsers1718792872935 implements MigrationInterface {
  name = 'AddRelationsBetweenBooksAndUsers1718792872935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_bb8627d137a861e2d5dc8d1eb20" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_bb8627d137a861e2d5dc8d1eb20"`);
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "userId"`);
  }
}

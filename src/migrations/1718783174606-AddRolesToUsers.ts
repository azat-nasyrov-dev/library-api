import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesToUsers1718783174606 implements MigrationInterface {
  name = 'AddRolesToUsers1718783174606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "roles" integer NOT NULL DEFAULT '1'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
  }
}

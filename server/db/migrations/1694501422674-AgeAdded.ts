import { MigrationInterface, QueryRunner } from "typeorm";

export class AgeAdded1694501422674 implements MigrationInterface {
    name = 'AgeAdded1694501422674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
    }

}

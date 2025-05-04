import { MigrationInterface, QueryRunner } from "typeorm";

export class Orders1746317616868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE "orders" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "total" decimal(10,2) NOT NULL,
                "status" character varying NOT NULL DEFAULT 'pending',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_orders" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_orders" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
            );

            CREATE TABLE "order_products" (
                "orderId" uuid NOT NULL,
                "productId" uuid NOT NULL,
                "quantity" integer NOT NULL,
                CONSTRAINT "PK_order_products" PRIMARY KEY ("orderId", "productId"),
                CONSTRAINT "FK_order_products_orders" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_order_products_products" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
            );
            `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order_products";`);
        await queryRunner.query(`DROP TABLE "orders";`);
    }
}

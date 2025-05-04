import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
} from "typeorm";
import { User } from "./User.entity";
import { Product } from "./Product.entity";
import { OrderProduct } from "./OrderProduct.entity";

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total: number;

    @Column({ default: "pending" })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Product)
    @JoinTable({
      name: "order_products",
      joinColumn: {
        name: "orderId", 
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "productId",
        referencedColumnName: "id",
      },
    })
    products: Product[];

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
      cascade: true,
    })
    orderProducts: OrderProduct[];
}
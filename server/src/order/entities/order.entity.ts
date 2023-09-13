import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @Column()
    userId: number;

    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product;

    @Column()
    productId: number;
    
}

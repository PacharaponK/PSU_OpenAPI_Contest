import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    detail: string;

    @Column("simple-array")
    picDetailURL: string[]

    @Column()
    pdfURL: string;

    @ManyToOne(() => Category, (category) => category.forms, {cascade: true})
    category: Category;
}



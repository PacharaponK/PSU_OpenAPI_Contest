import { Expose } from "class-transformer";
import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Expose({ groups: ['detail']})
    @Column("simple-array", {nullable: true})
    detail: string;

    @Expose({ groups: ['detail']})
    @Column("simple-array", { nullable: true })
    picDetailURL: string[]

    @Column()
    pdfURL: string;

    @Column({ nullable: true})
    updateDate: string;

    @Expose({ groups: ['detail']})
    @Column({nullable: true})
    pageModified: number;

    @Expose({ groups: ['detail']})
    @Column("simple-json", {nullable: true})
    modifiedConfig : {
        type: string,
        posX: number,
        posY: number,
        data: string,
    }[]

    @ManyToOne(() => Category, (category) => category.forms, {cascade: true})
    category: Category;
}



import { Expose } from "class-transformer";
import { Category } from "src/categories/entities/category.entity";
import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: 0})
    totalView: number;

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
    @Column("simple-json", {nullable: true})
    modifiedConfig : {
        type: string,
        posX: number,
        posY: number,
        gap: number,
        data: string,
        page: number,
    }[]

    @ManyToOne(() => Category, (category) => category.forms, {cascade: true})
    category: Category;

    @OneToMany(() => Feedback, (feedback) => feedback.form)
    feedbacks: Feedback[];
}



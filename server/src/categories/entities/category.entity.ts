import { Form } from "src/forms/entities/form.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    icon: string;

    @Column({nullable: true})
    criterion: string;

    @OneToMany(() => Form, (form) => form.category)
    forms: Form[];
}

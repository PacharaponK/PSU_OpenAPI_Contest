import { Form } from "src/forms/entities/form.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => User, (user) => user.feedbacks, {cascade: true})
    user: User ;

    @ManyToOne(() => Form, (form) => form.feedbacks, {cascade: true})
    form: Form
}

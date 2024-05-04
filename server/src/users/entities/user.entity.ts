import { Expose } from "class-transformer";
import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @Expose({ groups: ['detail']})
    @PrimaryColumn()
    id: number;

    @Expose({ groups: ['detail']})
    @Column({ nullable: true })
    studentId: string;

    @Column({ nullable: true })
    dorm: string;

    @Column({ nullable: true })
    dormDetail: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    scholarship: string;

    @OneToMany(() => Feedback, (feedback) => feedback.user)
    feedbacks: Feedback[];
}

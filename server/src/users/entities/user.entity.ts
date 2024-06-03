import { Expose } from "class-transformer";
import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @Expose({ groups: ['detail'] })
    @PrimaryGeneratedColumn()
    id: number;

    @Expose({ groups: ['detail'] })
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

    @Column({ default: true })
    firstLogin: boolean;

    @OneToMany(() => Feedback, (feedback) => feedback.user)
    feedbacks: Feedback[];
}

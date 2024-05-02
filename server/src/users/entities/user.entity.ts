import { Expose } from "class-transformer";
import { Column, Entity, PrimaryColumn } from "typeorm";

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
}

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    studentId: string;

    @Column({ nullable: true })
    dorm: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    scholarship: string;
}

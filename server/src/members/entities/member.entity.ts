import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class Member {
    @PrimaryColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false})
    name: string;

    @Column({ nullable: false })
    password: string;

    @Column()
    phone: string;

    @Column({ nullable: false })
    department: string;

    @Column({ nullable: true })
    profilePic: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}

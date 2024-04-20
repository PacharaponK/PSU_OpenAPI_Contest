import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}



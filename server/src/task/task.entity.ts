import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class Task {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    text: string;

    @Column()
    date: string;
}

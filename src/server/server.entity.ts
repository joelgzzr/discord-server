import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity()
export class Server extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @RelationId((server: Server) => server.user)
    ownerId: number;

    @ManyToOne(type => User, user => user.servers, { eager: false })
    @JoinColumn({ name: "ownerId" })
    user: User
}
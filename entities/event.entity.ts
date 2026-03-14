import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./base";
import { ChatEntity } from "./chat.entity";
import { UserEntity } from "./user.entity";

@Entity("events")
export class EventEntity extends BaseEntity {
  @Column("text")
  type!: "birthday";

  @Column("datetime")
  date!: Date;

  @Column("text")
  dateRaw!: string;

  @ManyToOne(() => ChatEntity, (chat) => chat.events)
  chat!: ChatEntity;

  @ManyToOne(() => UserEntity, (user) => user.events)
  user!: UserEntity;
}

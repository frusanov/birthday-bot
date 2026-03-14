import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base";
import { EventEntity } from "./event.entity";

@Entity("chats")
export class ChatEntity extends BaseEntity {
  @Column("bigint", { unique: true })
  tgId!: number;

  @Column("json")
  settings!: Record<string, unknown>;

  @OneToMany(() => EventEntity, (event) => event.chat)
  events!: Array<EventEntity>;
}

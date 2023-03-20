import { Types } from "mongoose";

export interface TodoEntity {
    id: Types.ObjectId;
    title: string;
    done: boolean;
    createdAt: Date;
    updatedAt?: Date;
    userId: Types.ObjectId;
}
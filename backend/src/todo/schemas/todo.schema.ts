import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    done: boolean;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    updatedAt?: Date;

    @Prop({ required: true, type: Types.ObjectId })
    userId:  Types.ObjectId
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
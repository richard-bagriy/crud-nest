export interface Todo {
    id: string;
    title: string;
    done: boolean;
    createdAt: Date;
    updatedAt?: Date;
    userId: string;
}
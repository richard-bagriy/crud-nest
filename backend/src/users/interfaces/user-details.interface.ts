import { Roles } from "../enum/roles.enum";

export interface UserDetails {
    id: string;
    email: string;
    username: string;
    role: Roles;
    createdAt?: Date;
    updatedAt?: Date;
    refreshToken?: string;
}
export interface UserDetails {
    id: string;
    email: string;
    username: string;
    createdAt?: Date;
    updatedAt?: Date;
    refreshToken?: string;
}
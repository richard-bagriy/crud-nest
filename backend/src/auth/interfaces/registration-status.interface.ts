import { UserDetails } from "../../users/interfaces/user-details.interface";

export interface RegistrationStatus {
    success: boolean;
    message: string;
    user?: UserDetails
}
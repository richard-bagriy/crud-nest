import { JwtPayload } from "./jwt.payload.interface";

export interface JwtWithRefresh extends JwtPayload {
    refreshToken: string
}
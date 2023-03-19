import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, encryptedPassword);
    }
}
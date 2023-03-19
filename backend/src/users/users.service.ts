import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user.create.dto';
import { HashService } from './hash.service';
import { UserDetails } from './interfaces/user-details.interface';
import { UserDocument, User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService) {}

    async create(userDto: UserCreateDto): Promise<UserDetails> {
        const { email, password } = userDto;

        const userExists = await this.userModel.findOne({ email });
        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await this.hashService.hashPassword(password);
        const newUser = new this.userModel({...userDto, password: hashedPassword, createdAt: new Date()});
        await newUser.save();
        return this._sanitizeUser(newUser);
    }

    public _sanitizeUser(user: UserDocument): UserDetails {
        const { email, username, id, createdAt, updatedAt } = user;
        return { email, username, id, createdAt, updatedAt };
    }
}

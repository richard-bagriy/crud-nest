import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user.create.dto';
import { UserDetails } from './interfaces/user-details.interface';
import { UserDocument, User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(userDto: UserCreateDto): Promise<UserDetails> {
        const { email } = userDto;

        const userExists = await this.userModel.findOne({ email });
        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const newUser = new this.userModel({...userDto, createdAt: new Date()});
        await newUser.save();
        return this._sanitizeUser(newUser);
    }

    public _sanitizeUser(user: UserDocument): UserDetails {
        const { email, username, id, createdAt, updatedAt } = user;
        return { email, username, id, createdAt, updatedAt };
    }
}

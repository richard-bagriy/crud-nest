import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/user.create.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { HashService } from './hash.service';
import { UserDetails } from './interfaces/user-details.interface';
import { UserDocument, User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService) {}

    public async create(userCreateDto: UserCreateDto): Promise<UserDetails> {
        const { email, password } = userCreateDto;

        const userExists = await this.userModel.findOne({ email });
        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST, { cause: new Error() });
        }

        const hashedPassword = await this.hashService.hashPassword(password);
        const newUser = new this.userModel({...userCreateDto, password: hashedPassword, createdAt: new Date()});
        await newUser.save();
        return this._sanitizeUser(newUser);
    }

    public async findByLogin({ email, password }: UserLoginDto): Promise<UserDetails> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new HttpException("Wrong email or password", HttpStatus.BAD_REQUEST, { cause: new Error() });
        }

        const equalPassword = await this.hashService.comparePassword(password, user.password);
        if (!equalPassword) {
            throw new HttpException("Wrong email or password", HttpStatus.BAD_REQUEST, { cause: new Error() });
        }

        return this._sanitizeUser(user);
    }


    private _sanitizeUser(user: UserDocument): UserDetails {
        const { email, username, id, createdAt, updatedAt } = user;
        return { email, username, id, createdAt, updatedAt };
    }

    public async findById(id: string): Promise<UserDetails> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST, { cause: new Error() });
        }

        return this._sanitizeUser(user);
    }

    public async updateRefreshToken(id: string, token: string): Promise<void> {
        // TODO: make some check
        this.userModel.findByIdAndUpdate(id, { $set: {
            refreshToken: token
        }});
        
    }
}

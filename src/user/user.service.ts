import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchema } from './schemas/user.schema';

@Injectable()
export class UsersService {
    @InjectModel('User') private userModel: Model<UserDocument>

    async findAll() {
        const users = await this.userModel.find({})
        return users
    }
    async findOne(username: string) {
        const user = await this.userModel.findOne({ username:username })
        return user
    }
    async createUser(body): Promise<any> {
        var { email, username, isAdmin,password } = body
        isAdmin === 'on' ? (isAdmin = true) : (isAdmin = false)
        var user = await new this.userModel({ email, username, isAdmin, password });
        user.save() 
        // var registeredUser = UserSchema.plugin(user, password);
    }
    async deleteUser(id){
        await this.userModel.findOneAndDelete({id})
    }
    async updateUser(id,body){
        await this.userModel.findOneAndUpdate({id:id},body)
    }
}

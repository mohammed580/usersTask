/* import mongoose, { Document, Schema, Model, model } from "mongoose";
import { IUser } from "../interfaces/user";
import * as passportLocalMongoose from 'passport-local-mongoose';


export const UserSchema = new mongoose.Schema({
    email: String,
    isAdmin:{type:Boolean,default:false}
})

UserSchema.plugin(passportLocalMongoose)

 */
import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    username: string;

    @Prop({ default: false, required: true })
    isAdmin: Boolean
}

export const UserSchema = SchemaFactory.createForClass(User);

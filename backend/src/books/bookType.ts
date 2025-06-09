import { User } from "../user/user.types";

export interface BookType {
    _id : string;
    title: string;
    author : User;
    genre : string;
    coverImageUrl : string;
    file : string;
    createAt : Date;
    updatedAt : Date;
}
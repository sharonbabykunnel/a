import CustomError from "../helpers/customError";
import * as authR from './../repository/auth.repository'
import { User, UserDocument } from "../types";

export async function signin(credential: string, password: string): Promise<User> {
    if (!credential || !password) throw new CustomError('Credential and Password are required', 400, 'VALIDATION_ERROR');
    const isNumeric = !isNaN(Number(credential)) && !isNaN(parseFloat(credential));
    const parseCredential = isNumeric ? Number(credential) : credential;
    let user: User | null;
    if (typeof parseCredential === 'number') {
        user = await authR.findByNumber(parseCredential);
    } else {
        user = await authR.findByEmail(parseCredential);
    }
    if (!user) throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
    const verify = await authR.verifyPassword(password, user.password);
    if (!verify) throw new CustomError('Incorrect password', 401, 'INCORRECT_PASSWORD');
    return user;
}

export async function signup(values: UserDocument): Promise<User> {
    if (!values.email || !values.password || !values.name || !values.number) 
        throw new CustomError("Email, Number, Name, and Password are required", 400, 'VALIDATION_ERROR');
    const existingUser = await authR.findByEmail(values.email);
    if (existingUser) throw new CustomError("User already exists", 400, 'USER_ALREADY_EXISTS');
    const existingNumber = await authR.findByNumber(values.number);
    if (existingNumber) throw new CustomError("Number already exists. Login using the number.", 400, 'USER_ALREADY_EXISTS');
    const response = await authR.createUser(values);
    console.log(response, 'response');
    return response;
}
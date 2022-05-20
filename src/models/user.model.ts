export interface User {
    userId: number | null;
    username: string;
    email: string;
    password: string;
    fullname: string;
    birthday: Date;
    address: string;
}
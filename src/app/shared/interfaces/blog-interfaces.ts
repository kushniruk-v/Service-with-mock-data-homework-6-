export interface IBlog {
    id: number ;
    title:string;
    postedBy: string;
    date: Date;
    message: string;
}
export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
}
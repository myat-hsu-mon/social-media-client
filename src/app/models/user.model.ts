export interface User{
    name:string;
    email:string;
    password:string;
    posts:object;
    _id:string;
    userData:Object;
    friendSuggests:any;
}
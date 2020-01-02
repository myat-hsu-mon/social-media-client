export interface User{
    name:string;
    email:string;
    password:string;
    posts:any;
    _id:string;
    userData:Object;
    friendSuggests:any;
    numberOfFriendSuggests:number;
    friendSuggestsForNoti:any;
    messages:any;
}
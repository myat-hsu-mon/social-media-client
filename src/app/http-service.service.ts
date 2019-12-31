import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
  constructor(private http:HttpClient) { 
   
  }
async signup(userData,url){
  return (await this.http.post(environment.host+url,JSON.stringify(userData),this.httpOptions));
 
}
async login(loginData, url){
  return await this.http.post(environment.host+url,JSON.stringify(loginData),this.httpOptions);
   

}
async createPost(postValueAndUserId,url){
  return await this.http.post(environment.host+url,JSON.stringify(postValueAndUserId),this.httpOptions)
 
}
async search(searchValue,url){
  return this.http.post(environment.host+url,JSON.stringify(searchValue),this.httpOptions)
}
async getSearchUserData(id,url){
  return  this.http.post(environment.host+url,JSON.stringify({id}),this.httpOptions);
}
async profile(id,url){
  return await this.http.post(environment.host+url,JSON.stringify({id}),this.httpOptions);
}

}

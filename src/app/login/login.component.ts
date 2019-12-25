import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _httpService: HttpServiceService, 
    private router:Router,
    private _userService:UserServiceService) { }

  ngOnInit() {
  }
 async login(loginData){    
  (await  this._httpService.login(loginData.value,'login'))
  .subscribe(data =>{
    this._userService.getUserData(data);
    
  });   
   this.router.navigate(['/home']);
  }

}

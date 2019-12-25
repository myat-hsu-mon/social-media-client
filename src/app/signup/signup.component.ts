import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private _httpService:HttpServiceService,
    private router:Router
    ) { }

  ngOnInit() {
  }
 async signup(signupData){
      ( await this._httpService.signup(signupData.value,'signup'))
      .subscribe(data=>{
      })
      // this.router.navigate(['/home']);

  }

}

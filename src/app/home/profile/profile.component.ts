import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  constructor(private _userService:UserServiceService) { }

  ngOnInit() {
   this._userService.searchProfileData.subscribe((searchUserData:User)=>{
     this.user = searchUserData;
   })

  }

}

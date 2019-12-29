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
  posts;
  name:String;

  constructor(private _userService:UserServiceService) { }

  ngOnInit() {
   this._userService.searchProfileData.subscribe((searchUser:User)=>{
     this.name = searchUser.name;
     this.posts = searchUser.posts;
   })

  }

}

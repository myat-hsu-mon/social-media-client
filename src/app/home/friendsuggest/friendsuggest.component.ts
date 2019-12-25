import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-friendsuggest',
  templateUrl: './friendsuggest.component.html',
  styleUrls: ['./friendsuggest.component.css']
})
export class FriendsuggestComponent implements OnInit {
  user:any;
  friendSuggests:any;
  // friendSuggests=['A','B','C'];
  constructor(
    private _userService:UserServiceService
  ) { }

  ngOnInit() {
    this._userService.userData.subscribe((data:User)=>{
      this.user = data;
      console.log("User is ",this.user);
      this.friendSuggests = data.friendSuggests;
      console.log("friend suggest",this.friendSuggests);
      
    })
  }

}

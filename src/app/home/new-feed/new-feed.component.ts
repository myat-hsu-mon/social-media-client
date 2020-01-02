import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css']
})
export class NewFeedComponent implements OnInit {
  posts = [];
  name:String;
 
  constructor(private _userService:UserServiceService) { }

  ngOnInit() {
    this._userService.userData.subscribe(data =>{
      this.posts.push(data);
      console.log("posts:",this.posts);
    })

  }

}

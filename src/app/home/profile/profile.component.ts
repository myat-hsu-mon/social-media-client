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
    // this._userService.searchProfileData.subscribe((data: User)=>{  
    //   if(!data.posts){
    //     this.posts.push(data.posts);
    //     console.log("search wall is", this.posts);
    //     this.name = data.name;
    //     console.log("Search name is ,", this.name);
    // }else{
    //   console.log("data is ,",data);
    // }
    //   })
    this._userService.userData.subscribe((user:User)=>{
      this.name = user.name;
      this.posts = user.posts;
      console.log("name and posts",this.name,this.posts);
    })

  }

}

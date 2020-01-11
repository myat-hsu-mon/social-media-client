import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { SocketServiceService } from '../socket-service.service';
import { MatBottomSheetRef } from '@angular/material';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postedData: Object;
  user:any;

  constructor(
    private _service:HttpServiceService,
    private _userService:UserServiceService,
    private _socketService:SocketServiceService,
) { }

  ngOnInit() {
    this._userService.userData.subscribe(userData =>{
      this.user = userData;

    })
  }
  async createPost(postedValue){
     
    const data = {
      postedValue,
      id:this.user._id,
      name:this.user.name
    };
    this._socketService.createPost(data);
   
  }

}

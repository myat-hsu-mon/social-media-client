import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { UserServiceService } from '../services/user-service.service';
import { SocketServiceService } from '../home/socket-service.service';
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
     
    // console.log("user id is in create post ,",this.user._id);    
    // return (await this._service.createPost({postedValue,id:this.user._id},"post"))
    // .subscribe(data =>{
    //   this._userService.getPostedData(postedValue);
      
    // })
    const data = {
      postedValue,
      id:this.user._id
    };
    this._socketService.createPost(data);
   
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreatePostComponent } from '../create-post/create-post.component';
import { HttpServiceService } from '../http-service.service';
import { UserServiceService } from '../services/user-service.service';
import { SocketServiceService } from './socket-service.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbDropdownConfig]
})
export class HomeComponent implements OnInit {
    
    socketId;
    searchValue : String;
    searchResult : any = [];
    data: any;
    user;
    friendSuggests=[];
    confirmOrFriend = 'cconfirm';


  constructor(
    public _dialog: MatDialog,
    private _httpService: HttpServiceService,
    private _userService: UserServiceService,
    private _socketService: SocketServiceService,
    private config:NgbDropdownConfig,
    private router:Router
    ) { 
      config.autoClose = false;
      this.socketId = this._socketService.socketID;
      
    }

  ngOnInit() {
    console.log('socket id from home:', this.socketId)
    this._userService.userData.subscribe((userData:User) =>{
      this.user = userData;
      // this.friendSuggests=userData.friendSuggests;
      // console.log("Friend suggests is ", this.friendSuggests);  
       
    })
    this._socketService.friendRequest(this.user._id).subscribe((receiver: User)=>{
      
        this.searchResult = this.searchResult.map(value =>{
        
          if(value._id == receiver._id)
          {
            value.relationship = 'Cancel Request'
          }
          return value;
        })
      
      
     
    })
    this._socketService.noti(this.user._id).subscribe((senderData:User)=>{
      // this.friendSuggests.push(senderData);
      console.log("senderdata is",senderData)
      console.log(senderData.name,"sent you ",this.user.name,"a friend request");
    })


  }
  createPost() {
    this._dialog.open(CreatePostComponent);
  }
  async search(){
    
   return (await this._httpService.search({searchValue: this.searchValue},'search'))
   .subscribe(data =>{
      this.searchResult = data;
     console.log('search result:', this.searchResult)
    this.searchResult = this.searchResult.map(value =>{
      if(value.friends.includes(this.user._id)){
        value.relationship = 'Friends';
      } else if(value.friendSuggests.includes(this.user._id)){
        value.relationship = 'Cancel Request';
      }else if(value.friendRequests.includes(this.user._id)){
        value.relationship = 'Accept Request';
      }else{
        value.relationship = 'Add Friend'; 
      }
      return value;
     })
      
      this._userService.getSearchResult(this.searchResult);
      })
  }  


  confirm(id, name) {
    const data = {
      senderId: this.user._id,
      senderName: this.user.name,
      receiverId: id,
      receiverName: name
    }

    this._socketService.confirm(data);//confirm data via socket server
    //socket emit
    this._socketService.confirmEmit(this.user._id).subscribe((receiver: User) => {
      this.friendSuggests = this.user.friendSuggests.map(value => {
        if (value.senderId == receiver._id) {
          this.confirmOrFriend = "Friend";

        }
        return value;
      })
    })

  }
  profile(){
    this._userService.getSearchProfile(this.user);
    this.router.navigate( ['/home/profile',this.user._id]);
  }


}


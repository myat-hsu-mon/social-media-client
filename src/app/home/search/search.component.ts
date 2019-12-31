import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { SocketServiceService } from '../socket-service.service';
import { User } from 'src/app/models/user.model';
import { HttpServiceService } from 'src/app/http-service.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[NgbDropdownConfig]
})
export class SearchComponent implements OnInit {
searchResult:any;
user:any;
  constructor(
    private _userService:UserServiceService,
    private _socketService: SocketServiceService,
    private _httpService: HttpServiceService,
    private config: NgbDropdownConfig,
    private router:Router
    ) {
      // config.placement = 'top-left';
     // config.autoClose = false;      
   }

  

  ngOnInit() {
    this._userService.searchResult.subscribe(searchResult=>{
      this.searchResult = searchResult;      
    });

    this._userService.userData.subscribe(userData =>{
      this.user = userData;
    })

  }
  click(id, name , relationship){
    if(relationship == 'Cancel Request'){
      this.cancelRequest(id, name)
    }else if(relationship == 'Add Friend'){
      this.addFriend(id, name)
    }
    
  }

  addFriend(id, name){
    const data = {
      senderId: this.user._id,
      senderName:this.user.name,
      receiverId:id,
      receiverName:name
    }
    this._socketService.addFriend(data) 
  }
  cancelRequest(id, name){
    const data = {
      senderId: this.user._id,
      senderName:this.user.name,
      receiverId:id,
      receiverName:name
    }
    this._socketService.cancelRequest(data)
  }
  
  async wall(searchId){
     (await this._httpService.getSearchUserData(searchId,'profile'))
    .subscribe(searchUserData =>{
      // _id,name,posts 
      this.user = searchUserData;
      this.user.viewerId = this.user._id;
      console.log("Data to enter wall ,", this.user);
      this._userService.getSearchProfile(this.user);
    });

    this.router.navigate(['/home/profile',searchId]);  

  }


}

import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';
import { MessageBottomsheetComponent } from '../message-bottomsheet/message-bottomsheet.component';
import { SocketServiceService } from '../socket-service.service';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  constructor(
    private _userService:UserServiceService,
    private _bottomSheet: MatBottomSheet,
    private _socketService: SocketServiceService
    ) { }

  ngOnInit() {
   this._userService.searchProfileData.subscribe((searchUserData:User)=>{
     this.user = searchUserData;
   })

  }

  sendMessage(){
    console.log("receiver id and name:", this.user._id, this.user.name)
    console.log("viewerId:",this.user.viewerId)
    let conversationData = {
      conversationId: this.user._id,
      viewerId: this.user.viewerId
    }
    this._socketService.openMessageConversation(conversationData)
    this._bottomSheet.open(MessageBottomsheetComponent,{
      data:{
        senderId:this.user.viewerId,
        receiverId: this.user._id,
        receiverName: this.user.name,
       },
      panelClass:'resize',
      disableClose:true,
      hasBackdrop:false,
    });  
  }

}

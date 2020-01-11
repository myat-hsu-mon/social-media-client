import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';
import { MessageBottomsheetComponent } from '../message-bottomsheet/message-bottomsheet.component';
import { SocketServiceService } from '../socket-service.service';
import { MatBottomSheet } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  searchUser;
  user;
  messageButtonVisible;
  form : FormGroup;
  file : any;
  imagePreview;
  isImagePreview = false;
  constructor(
    private _userService: UserServiceService,
    private _bottomSheet: MatBottomSheet,
    private _socketService: SocketServiceService,
    private _httpService: HttpServiceService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      text : new FormControl(null,{validators:Validators.required}),
      image : new FormControl(null,{validators:Validators.required})
    })

    this._userService.profileData.subscribe((searchUser) => {
      this.searchUser = searchUser;//viewerid,receiver => _id,name,posts,relationship
      //if addfriend,cancelrequest, acceptrequest
      if (this.searchUser.relationship == 'Add Friend') {
        this.messageButtonVisible = true;
      } else if (this.searchUser.relationship == 'Cancel Request') {
        this.messageButtonVisible = true;
      } else if (this.searchUser.relationship == 'Accept Request') {
        this.messageButtonVisible = true;
      } else {
        this.messageButtonVisible = false;
      }
    })
    
    this._userService.profileData.subscribe((profileData: User) => {
      this.user = profileData;
      console.log("User in profile ts:",this.user);
    })   
  }

  makeFriendRelation() {
    if (this.searchUser.relationship == 'Add Friend') {
      this.addFriend();
    }
    else if (this.searchUser.relationship == 'Cancel Request') {
      this.cancelRequest();
    }
  }

  addFriend() {
    const data = {
      senderId: this.user._id,
      senderName: this.user.name,
      receiverId: this.searchUser._id,
      receiverName: this.searchUser.name
    }
    this._socketService.addFriend(data);
  }

  cancelRequest() {
    const data = {
      senderId: this.user._id,
      senderName: this.user.name,
      receiverId: this.searchUser._id,
      receiverName: this.searchUser.name
    }
    this._socketService.cancelRequest(data);
  }

  sendMessage() {
    let conversationData = {
      conversationId: this.searchUser._id,
      viewerId: this.searchUser.viewerId
    }
    this._socketService.openMessageConversation(conversationData)
    this._bottomSheet.open(MessageBottomsheetComponent, {
      data: {
        senderId: this.searchUser.viewerId,
        receiverId: this.searchUser._id,
        receiverName: this.searchUser.name,
      },
      panelClass: 'resize',
      disableClose: true,
      hasBackdrop: false,
    });
  }

  onImagePicked(event : Event){
    this.isImagePreview = true;
    this.file = (event.target as HTMLInputElement).files[0];
    console.log("file selected:",this.file);
    const reader =new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.file)
    
  }

  onPost(formValue){
    console.log("formValue:",formValue)//image:'fakepath/MyatHsuMon.jpg
    const formData = new FormData();
    formData.append('image',this.file, this.file.name);
    formData.append('text',formValue.text);
    
    
  }

}

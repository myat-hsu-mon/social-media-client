import { Component, OnInit } from '@angular/core';
import { MatDialog, MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { CreatePostComponent } from './create-post/create-post.component';
import { HttpServiceService } from '../http-service.service';
import { UserServiceService } from '../services/user-service.service';
import { SocketServiceService } from './socket-service.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FriendSuggest } from '../models/friendSuggest.model';
import { MessageBottomsheetComponent } from './message-bottomsheet/message-bottomsheet.component';
import { MessageServiceService } from '../services/message-service.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbDropdownConfig]
})
export class HomeComponent implements OnInit {
    user;
    socketId;
    searchValue : String;
    searchResult : any = [];
    data: any;
    friendSuggests=[];
    confirmOrFriend = 'Accept Request';
    friendsWithIdAndName =[];
    text: String ;
    myMessage="";
    otherMessage="";
    messageList : any;
    messageConversation;


  constructor(
    public _dialog: MatDialog,
    private _httpService: HttpServiceService,
    private _userService: UserServiceService,
    private _socketService: SocketServiceService,
    private config:NgbDropdownConfig,
    private router:Router,
    private _bottomSheet: MatBottomSheet,
    private _messageService:MessageServiceService
    ) { 
      config.autoClose = false;
      this.socketId = this._socketService.socketID;
      
    }

  ngOnInit() {
    this._userService.userData.subscribe((userData:User) =>{
      this.user = userData;  
      console.log(this.user)     
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

    this._socketService.canceledRequest(this.user._id).subscribe((receiver: User)=>{
      this.searchResult = this.searchResult.map(value =>{ 
        if(value._id == receiver._id)
        {
          value.relationship = 'Add Friend'
        }
        return value;
      })
    })

    this._socketService.friendSuggestNoti(this.user._id).subscribe((notiData: FriendSuggest)=>{
     
      this.user.numberOfFriendSuggests = notiData.numberOfFriendSuggests;
      this.user.friendSuggestsForNoti = notiData.friendSuggestsForNoti; 
    })

    this._socketService.removedFriendSuggestsNoti(this.user._id).subscribe((notiData: FriendSuggest)=>{
      this.user.numberOfFriendSuggests = notiData.numberOfFriendSuggests;
    })

    this._socketService.acceptedRequest(this.user._id).subscribe((sender: User) => {
      this.user.friendSuggestsForNoti = sender.friendSuggestsForNoti;
    })

    this._socketService.getMyMessage(this.user._id).subscribe((message)=>{
      this._messageService.getMessage(message);
      
    })

    this._socketService.receivedMessage(this.user._id).subscribe((message) => {
      this._messageService.getMessage(message);        
    })

    this._socketService.receivedMessageConversation().subscribe((messageConversation) => {
      this._messageService.getMessage(messageConversation);
    })
    this._socketService.friendsWithIdAndName(this.user._id).subscribe((friends: User) => {
       this.user.friends = friends;
    })

    this._socketService.createPostEmit(this.user._id).subscribe((userWithNewData)=>{
      this._userService.getUserData(userWithNewData);
    })

    this._socketService.gotMessageList(this.user._id).subscribe((messageList)=>{
        this.messageList = messageList;
        console.log("Message list :",this.messageList);
    })

    


  } // end on Oninit

  removeFriendSuggestsNoti(){
    this._socketService.removeFriendSuggestsNoti(this.user._id);
  }
 
  createPost(){
    this._dialog.open(CreatePostComponent);
  }

  async search(){    
   return (await this._httpService.search({searchValue: this.searchValue},'search'))
   .subscribe(data =>{
      this.searchResult = data;
     console.log('search result:', this.searchResult)
    this.searchResult = this.searchResult.map(value =>{
      if(value._id == this.user._id){
        value.relationship = '';
      }else if(value.friends.includes(this.user._id)){
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
      this.router.navigate(['/home/search']);
      })
     
  }  


  acceptRequest(id, name) {
    const data = {
      senderId: this.user._id,
      senderName: this.user.name,
      receiverId: id,
      receiverName: name
    }    

    this._socketService.acceptRequest(data);//confirm data via socket server
    //socket emit 
  }
  profile(){
    // this._userService.userData.subscribe((user:User)=>{
    //   this.user = user;
    // })
    this._userService.getSearchProfile(this.user);
    this.router.navigate( ['/home',this.user._id]);
  }

  openMessageConversation(conversation
    ){
    
    let conversationData = {
      conversationId: conversation._id,
      viewerId: this.user._id
    }
    this._socketService.openMessageConversation(conversationData)
     this._bottomSheet.open(MessageBottomsheetComponent,{
       data:{
         senderId:this.user._id,
         receiverId: conversation._id,
         receiverName: conversation.name,
        },
       panelClass:'resize',
       disableClose:true,
       hasBackdrop:false,
     });  
  }

  closeMessage(){
    this._bottomSheet.dismiss();
  }

  getMessageList(){
    this._socketService.getMessageList(this.user._id);
  }



 
}


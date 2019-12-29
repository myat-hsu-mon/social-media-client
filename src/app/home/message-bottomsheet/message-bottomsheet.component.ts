import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';
import { SocketServiceService } from '../socket-service.service';
import { MessageServiceService } from 'src/app/services/message-service.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-message-bottomsheet',
  templateUrl: './message-bottomsheet.component.html',
  styleUrls: ['./message-bottomsheet.component.css']
})
export class MessageBottomsheetComponent implements OnInit {
  text:String;
  messages;
  float: Boolean  = false;
  // receivedMessage ="";

  constructor(
    private _matBottomSheetRef:MatBottomSheetRef,
    private _userService:UserServiceService,
    private _socketService:SocketServiceService,
    private _messageService:MessageServiceService,
    @Inject(MAT_BOTTOM_SHEET_DATA)public data:any,

    ) { }

  ngOnInit() {
    this._messageService.receivedMessage.subscribe((message: User)=>{
      if(Object.keys(message).length){
          this.messages = message;
        }
    })    
    
  
  }
  sendMessage(){   
    const message = {
      from: this.data.senderId,
      to: this.data.receiverId,
      body:this.text
    }
    this._socketService.sendMessage(message);    
    this.text = "";
  }

}

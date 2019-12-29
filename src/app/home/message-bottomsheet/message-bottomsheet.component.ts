import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';
import { SocketServiceService } from '../socket-service.service';


@Component({
  selector: 'app-message-bottomsheet',
  templateUrl: './message-bottomsheet.component.html',
  styleUrls: ['./message-bottomsheet.component.css']
})
export class MessageBottomsheetComponent implements OnInit {
  text:String;
  messages =[];

  constructor(
    private _matBottomSheetRef:MatBottomSheetRef,
    private _userService:UserServiceService,
    private _socketService:SocketServiceService,
    @Inject(MAT_BOTTOM_SHEET_DATA)public data:any
    ) { }

  ngOnInit() {
  
  }
  sendMessage(){   
    const message = {
      from: this.data.senderId,
      to: this.data.receiverId,
      body:this.text
    }
    this._socketService.sendMessage(message);
    this.messages.push(this.text);
    this.text = "";
  }

}

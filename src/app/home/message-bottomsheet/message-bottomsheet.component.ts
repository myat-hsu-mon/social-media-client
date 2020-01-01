import { Component, OnInit, Inject, ElementRef, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import {  MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { SocketServiceService } from '../socket-service.service';
import { MessageServiceService } from 'src/app/services/message-service.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-message-bottomsheet',
  templateUrl: './message-bottomsheet.component.html',
  styleUrls: ['./message-bottomsheet.component.css']
})
export class MessageBottomsheetComponent implements OnInit, AfterViewChecked {
  text:String;
  messages;
  @ViewChild('scrollMe', {static:false}) private myScrollContainer: ElementRef;
  constructor(
    private _socketService:SocketServiceService,
    private _messageService:MessageServiceService,
    @Inject(MAT_BOTTOM_SHEET_DATA)public data:any,

    ) { }
    
  ngOnInit() {
    this._messageService.receivedMessage.subscribe((messages: User)=>{
      if(Object.keys(messages).length){
          this.messages = messages;
        }
        else{
          this.messages = [];
        }
        
    })  
    
    this.scrollToBottom();
  }



  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
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


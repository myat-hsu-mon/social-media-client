import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-message-bottomsheet',
  templateUrl: './message-bottomsheet.component.html',
  styleUrls: ['./message-bottomsheet.component.css']
})
export class MessageBottomsheetComponent implements OnInit {
  friendData ;
  constructor(
    private _userService:UserServiceService,
    ) { }

  ngOnInit() {
   this._userService.friendData.subscribe(friendData =>{
     this.friendData = friendData;
   })
  }


}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreatePostComponent } from '../create-post/create-post.component';
import { HttpServiceService } from '../http-service.service';
import { UserServiceService } from '../services/user-service.service';
import { SocketServiceService } from './socket-service.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbDropdownConfig]
})
export class HomeComponent implements OnInit {
  searchValue: String;
  searchResult: any;
  data: any;
  user;
  friendSuggests = [];
  confirmOrFriend = 'confirm';


  constructor(
    public _dialog: MatDialog,
    private _httpService: HttpServiceService,
    private _userService: UserServiceService,
    private _socketService: SocketServiceService,
    private config: NgbDropdownConfig
  ) {
    config.autoClose = false;
  }

  ngOnInit() {

    this._userService.userData.subscribe((userData: User) => {
      this.user = userData;
      // this.friendSuggests=userData.friendSuggests;
      // console.log("Friend suggests is ", this.friendSuggests);     


    })
    this._socketService.friendSuggest(this.user._id).subscribe((receiver: User) => {
      console.log("search result", this.searchResult);
      this.searchResult = this.searchResult.map(value => {

        if (value._id == receiver._id) {
          value.relationship = 'Cancel Request'
        }

        return value;
      })

    })
    this._socketService.noti(this.user._id).subscribe((senderData: User) => {
      // this.friendSuggests.push(senderData);
      console.log("senderdata is", senderData)
      console.log(senderData.name, "sent you ", this.user.name, "a friend request");
    })

  }
  createPost() {
    this._dialog.open(CreatePostComponent);
  }
  async search() {
    return (await this._httpService.search({ searchValue: this.searchValue }, 'search'))
      .subscribe(data => {
        this.data = data
        // loop data

        for (let i = 0; i < this.data.length; i++) {
          for (let j = 0; j < this.data[i].friendSuggests.length; j++) {
            if (this.data[i].friendSuggests[j].senderId == this.user._id) {
              this.data[i].relationship = 'Cancel Request';
              break;
            } else {
              this.data[i].relationship = 'Add Friend'
            }
          }
        }
        // end of loop 
        this.searchResult = this.data;
        // console.log('search result from search function ', this.searchResult)
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


}


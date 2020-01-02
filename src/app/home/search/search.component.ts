import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { SocketServiceService } from '../socket-service.service';
import { User } from 'src/app/models/user.model';
import { HttpServiceService } from 'src/app/http-service.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [NgbDropdownConfig]
})
export class SearchComponent implements OnInit {
  searchResult: any;
  searchUser: any;
  user: any;
  constructor(
    private _userService: UserServiceService,
    private _socketService: SocketServiceService,
    private _httpService: HttpServiceService,
    private config: NgbDropdownConfig,
    private router: Router
  ) {
    // config.placement = 'top-left';
    // config.autoClose = false;      
  }


  ngOnInit() {
    this._userService.searchResult.subscribe(searchResult => {
      this.searchResult = searchResult;
    });

    this._userService.userData.subscribe(userData => {
      this.user = userData;
    })
  }

  click(id, name, relationship) {
    if (relationship == 'Cancel Request') {
      this.cancelRequest(id, name)
    } else if (relationship == 'Add Friend') {
      this.addFriend(id, name)
    }
  }

  addFriend(id, name) {
    const data = {
      senderId: this.user._id,
      senderName: this.user.name,
      receiverId: id,
      receiverName: name
    }
    this._socketService.addFriend(data)
  }

  cancelRequest(id, name) {
    const data = {
      senderId: this.user._id,
      senderName: this.user.name,
      receiverId: id,
      receiverName: name
    }
    this._socketService.cancelRequest(data)
  }

  async wall(searchId, relationship) {
    (await this._httpService.getProfile(searchId, 'profile'))
      .subscribe((searchUser : User) => {        
        const searchData = {
          viewerId : this.user._id,
          relationship : relationship,
          _id : searchUser._id,
          name: searchUser.name ,
          posts : searchUser.posts
        }
        this._userService.getProfile(searchData);
      });
    this.router.navigate(['home/profile', searchId]);
  }


}

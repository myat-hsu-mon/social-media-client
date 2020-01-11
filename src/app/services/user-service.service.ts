import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  postedDataArray = [];
  friendRequestArray = [];
  searchResult = new BehaviorSubject<[]>([]);
  userData = new BehaviorSubject<{}>({});
  postedData = new BehaviorSubject<any>({} as String);
  friendRequestData = new BehaviorSubject<any>({} as String);
  profileData = new BehaviorSubject<{}>({});
  friendData = new BehaviorSubject<{}>({});
  constructor() { }
  getSearchResult(search) {
    this.searchResult.next(search);
  }
  setUserData(user) {
    this.userData.next(user);
  }
  getPostedData(data) {
    this.postedDataArray.push(data)
    this.postedData.next(this.postedDataArray);
  }
  postFriendrequest(friendRequestName) {
    this.friendRequestArray.push(friendRequestName);
    this.friendRequestData.next(this.friendRequestArray);
  }
  getProfile(profileData) {
    this.profileData.next(profileData);
  }
  getFriend(friend) {
    this.friendData.next(friend);
  }





















}

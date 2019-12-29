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
  searchProfileData = new BehaviorSubject<{}>({});
  friendData = new BehaviorSubject<{}>({});
  constructor() { }
  getSearchResult(search) {
    this.searchResult.next(search);
  }
  getUserData(user) {
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
  getSearchProfile(searchProfileData) {
    this.searchProfileData.next(searchProfileData);
  }
  getFriend(friend) {
    this.friendData.next(friend);
  }





















}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  socketID
  socket = io('http://localhost:3000')
  constructor() {
   this.socket.on('connect',()=>{
     this.socketID = this.socket.id;
    })
  }

  login(userId, userName){
    const user = {
      userId,
      userName
    }
    this.socket.emit('login', user);
  }
  
  getActiveFriends(id){
    return new Observable( observer =>{
      this.socket.on(`${id}getActiveFriends`,activeFriends =>{
        observer.next(activeFriends)
      })
    })
  }

  
  addFriend(data) {
    this.socket.emit('addFriend', data);
  }

  cancelRequest(data) {
    this.socket.emit('cancelRequest', data);
  }

  canceledRequest(id) {
    return new Observable((observer) => {
      this.socket.on(`${id}canceledRequest`, (data) => {
        observer.next(data);
      })
    })
  }

  acceptRequest(data) {
    this.socket.emit('acceptRequest', data);
  }

  acceptedRequest(id) {
    return new Observable((observer) => {
      this.socket.on(`${id}acceptedRequest`, (data) => {
        observer.next(data);
      })

    })

  }
  createPost(data){
    this.socket.emit('create post',data);
  }
  createPostEmit(id) {
    return new Observable((observer) => {
      this.socket.on(id, (data) => {
        observer.next(data);
      })

    })
  }

  friendRequest(id) {
    console.log(id);
    return new Observable((observer) => {
      this.socket.on(`${id}friendRequest`, (data) => {
        observer.next(data);
      })
    })
  }

  friendSuggestNoti(id) {
    return new Observable((observer) => {
      this.socket.on(`${id}friendSuggestNoti`, (data) => {
        observer.next(data);
      })
    })
  }

  removeFriendSuggestsNoti(id) {
    this.socket.emit('removeFriendSuggestsNoti', id);
  }

  removedFriendSuggestsNoti(id) {
    return new Observable((observer) => {
      this.socket.on(`${id}removedFriendSuggestsNoti`, (data) => {
        observer.next(data);
      })
    })
  }

  getFriendsLists(friends){
    this.socket.emit('getFriendsLists',friends);
  }

  friendsWithIdAndName(id) {
    return new Observable((observer) => {
      this.socket.on(`${id}friendsWithIdAndName`, (data) => {
        observer.next(data);
      })
    })
  }

  sendMessage(message){    
    this.socket.emit('sendMessage',message);
  }
  
  getMyMessage(id){
    return new Observable((observer )=>{
      this.socket.on(`getMyMessage`, (message)=>{
        observer.next(message);
      })
    })
  } 

  receivedMessage(id){
    return new Observable((observer )=>{
      this.socket.on(`${id}receivedMessage`, (message)=>{
        observer.next(message);
      })
    })
  }

  getMessageList(id){
    this.socket.emit('getMessageList', id)
  }

  gotMessageList(id){
    return new Observable((observer )=>{
      this.socket.on(`gotMessageList`, (messageList)=>{
        observer.next(messageList);
      })
    })
  }

  openMessageConversation(conversationData){
    this.socket.emit('openMessageConversation', conversationData);
  }

  receivedMessageConversation(){
    return new Observable((observer )=>{
      this.socket.on(`receivedMessageConversation`, (messageConversation)=>{
        observer.next(messageConversation);
      })
    })
  }

  like(likeData){
    this.socket.emit('like', likeData);
  }
  liked(){
    return new Observable( observer =>{
      this.socket.on('liked', posts => {
        observer.next(posts);
      })
    })
  }
  
  dislike(dislike){
    this.socket.emit('dislike', dislike)
  }
  disliked(){
    return new Observable( observer =>{
      this.socket.on('disliked', (posts)=>{
        observer.next(posts)
      })
    })
  }

}// end of class

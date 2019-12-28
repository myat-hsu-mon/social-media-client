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
     // this.socketId.next(this.socket.id) ;
      console.log('socket id from service:', this.socketID)
    })
   }

  addFriend(data){
    this.socket.emit('addFriend',data);
  }

  cancelRequest(data){
    this.socket.emit('cancelRequest', data);
  }

  canceledRequest(id){
    return new Observable((observer)=>{
      this.socket.on(`${id}canceledRequest`, (data)=>{
        observer.next(data); 
      })
    })
  }

  acceptRequest(data){
    this.socket.emit('acceptRequest', data);
  }

  acceptedRequest(id){
    return new Observable((observer)=>{
      this.socket.on(`${id}acceptedRequest`, (data)=>{
        observer.next(data); 
      })
      
    })
    
  }

  createPost(data){
    this.socket.emit('create post',data);
  }
  createPostEmit(id){
    return new Observable((observer)=>{
      this.socket.on(id, (data)=>{
        observer.next(data); 
      })
      
    })
  }

  friendRequest(id){
      console.log(id);
    return new Observable((observer)=>{
      this.socket.on(`${id}friendRequest`, (data)=>{
        observer.next(data); 
      })   
    }) 
  }
  
  friendSuggestNoti(id){
    console.log("sender id for noti", id)
    return new Observable((observer)=>{
      this.socket.on(`${id}friendSuggestNoti`, (data)=>{
        observer.next(data); 
      })
    })
  }

  removeFriendSuggestsNoti(id){
    this.socket.emit('removeFriendSuggestsNoti',id);
  }

  removedFriendSuggestsNoti(id){
    return new Observable((observer)=>{
      this.socket.on(`${id}removedFriendSuggestsNoti`, (data)=>{
        observer.next(data); 
      })
    })
  }

  getFriendsLists(friends){
    this.socket.emit('friends',friends);
  }

  friendsWithIdAndName(id){
    return new Observable((observer)=>{
      this.socket.on(`${id}friendsWithIdAndName`, (data)=>{
        observer.next(data); 
      })
    })
  }

  sendMessage(message){
    this.socket.emit('sendMessage',message);
  }
 

}

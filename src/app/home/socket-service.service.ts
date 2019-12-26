import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
socket = io('http://localhost:3000');
socketId = new BehaviorSubject<String>("");
  constructor() { }
  addFriend(data){
    this.socket.emit('friend request',data);
  }
  cancelRequest(data){
    this.socket.emit('cancel request', data);
  }

  confirm(data){
    this.socket.emit('confirm', data);
  }
  confirmEmit(id){
    return new Observable((observer)=>{
      this.socket.on(id, (data)=>{
        observer.next(data); 
      })
      
    })
    
  }
  createPost(data){
    this.socket.emit('create post',data);
  }
  friendSuggest(id){
    return new Observable((observer)=>{
      this.socket.on(id, (data)=>{
        observer.next(data); 
      })
      
    })
    
  }
  noti(id){
    return new Observable((observer)=>{
      this.socket.on(id, (data)=>{
        observer.next(data); 
      })
      
    })
    
  }
}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
<<<<<<< HEAD
socket = io('http://localhost:3000');
socketId = new BehaviorSubject<String>("");
  constructor() { }
=======
    socketID
    socket = io('http://localhost:3000')
  constructor() {
   this.socket.on('connect',()=>{
     // this.socketId.next(this.socket.id) ;
      console.log('socket id from service:', this.socketID)
    })
   }
  
>>>>>>> 10cda338104720cb30c9f86de4a5e4baed9d12d8
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
<<<<<<< HEAD
=======

>>>>>>> 10cda338104720cb30c9f86de4a5e4baed9d12d8
  friendSuggest(id){
      console.log(id);
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

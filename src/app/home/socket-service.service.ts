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
      this.socket.on(id, (data)=>{
        observer.next(data); 
      })
      
    })
    
  }
  
  friendSuggestNoti(id){
    console.log("sender id for noti", id)
    return new Observable((observer)=>{
      this.socket.on(id, (data)=>{
        observer.next(data); 
      })
      
    })
    
  }
}

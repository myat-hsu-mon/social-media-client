import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
socketId
socket = io('http://localhost:3000')
  constructor() {
   this.socket.on('connect',()=>{
      this.socketId.next(this.socket.id) ;
      console.log('socket id from service:', this.socketId)
    })
   }
  
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

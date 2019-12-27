import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceService implements OnInit{
    socketID
    socket = io('http://localhost:3000')
  constructor() {
    this.socket.on('connect',()=>{
      this.socketID = this.socket.id;
       console.log('socket id from service:', this.socketID)
     })
   }
   ngOnInit(){
    
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

  friendRequest(id){
      console.log("sender id for cancel request",id);
    return new Observable((observer)=>{
      this.socket.on(`${id}friendRequest`, (data)=>{
        observer.next(data); 
      })
      
    })
    
  }
  noti(id){
    console.log("sender id for noti", id)
    return new Observable((observer)=>{
      this.socket.on(`${id}noti`, (data)=>{
        observer.next(data); 
      })
      
    })
    
  }
}

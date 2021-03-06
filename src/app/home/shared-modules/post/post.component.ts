import { Component, OnInit, Input } from '@angular/core';

import { SocketServiceService } from '../../socket-service.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  user:User;

@Input() post:any;
@Input() name:String;
@Input() viewerId:String;
@Input() viewerName:String;
@Input() comments:any;
  constructor(
    private _socketService : SocketServiceService) { }

  ngOnInit() {
    if(this.post.likes.includes(this.viewerId)){
      this.post.isLike = true;
    }
  }


  like(postId, postAuthorId, isLike, likedUserId) {
    const likeData = {
      postAuthorId ,
      postId ,
      likedUserId 
    }
    
    if(isLike){
      this._socketService.unlike(likeData)
    }else{
      this._socketService.like(likeData);
    }
    
  }

  sendComment(body, postId, postAuthorId){
    const commentData ={
      authorId : this.viewerId,
      authorName : this.viewerName,
      body,
      postAuthorId,
      postId,
    }
    this._socketService.sendComment(commentData);
  }

}


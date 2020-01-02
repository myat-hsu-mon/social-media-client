import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
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
@Input() name:any;
  constructor(
    private _userService : UserServiceService,
    private _socketService : SocketServiceService) { }

  ngOnInit() {
    this._userService.userData.subscribe((userData: User) =>{
      this.user = userData;     
    });

    console.log("Current likes array:",this.post.likes);
    if(this.post.likes.includes(this.user._id)){
      this.post.isLike = true;
    }
   
    
  }


  like(postId, postAuthorId, likedUserId) {
    const likeData = {
      postAuthorId ,
      postId ,
      likedUserId 
    }
    this._socketService.like(likeData);
  }

}


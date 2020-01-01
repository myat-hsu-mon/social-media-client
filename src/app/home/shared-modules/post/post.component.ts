import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { SocketServiceService } from '../../socket-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  user:Object;

@Input() post:any;
@Input() name:any;
  constructor(
    private _userService : UserServiceService,
    private _socketService : SocketServiceService) { }

  ngOnInit() {
    this._userService.userData.subscribe(userData =>{
      this.user = userData;     
    });
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


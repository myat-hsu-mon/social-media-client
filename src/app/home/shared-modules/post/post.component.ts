import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  commentArray = [];
  comment = '';
  like = false;
  likes = [];
  filter = [];
  index;
  user:Object;

@Input() post:any;
@Input() name:any;
  constructor(private _userService:UserServiceService) { }

  ngOnInit() {
    this._userService.userData.subscribe(userData =>{
      this.user = userData;     
    });

  }
  send(data) {
    this.commentArray.push(data);  
  }

  liked(userId) {
    this.like = !this.like;
    this.index = this.likes.indexOf(userId);
    if (this.index > -1) {
      this.likes.splice(this.index, 1);
    } else {
      this.likes.push(userId);
    }   
  }
}


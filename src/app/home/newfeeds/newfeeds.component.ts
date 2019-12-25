import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-newfeeds',
  templateUrl: './newfeeds.component.html',
  styleUrls: ['./newfeeds.component.css']
})
export class NewfeedsComponent implements OnInit {
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

    // this._userService.postedData.subscribe(postedData =>{
    //   this.postedData = postedData;
    //   console.log("Newfeeds in posteddata is", this.postedData);
    //   console.log("postedvalue",this.postedData);
    // })

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



import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreatePostComponent } from '../create-post/create-post.component';
import { SocketServiceService } from './socket-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'newfeed'
      },
      {
        path: "newfeed",
        loadChildren:'./new-feed/new-feed.module#NewFeedModule'
      },
      {
        path: "profile",
        loadChildren:'./profile/profile.module#ProfileModule'
      },
      {
        path: "message",
        loadChildren:'./message/message.module#MessageModule'
      },
      {
        path:"search",
        loadChildren:'./search/search.module#SearchModule'
      },    
      {
        path:"friendsuggest",
        loadChildren:'./friendsuggest/friendsuggest.module#FriendsuggestModule'
      }
    ]
  },

]

@NgModule({
  declarations: [
    HomeComponent,
    CreatePostComponent,
    
   
  
   
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule
    
  ],
  exports: [RouterModule],
  entryComponents:[CreatePostComponent],
  providers:[SocketServiceService]


})
export class HomeModule { }

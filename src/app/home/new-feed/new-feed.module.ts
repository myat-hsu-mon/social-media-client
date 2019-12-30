import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFeedComponent } from './new-feed.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { Routes, RouterModule } from '@angular/router';
import { PostModule } from '../shared-modules/post/post.module';
 const routes :Routes =[
   {
     path:'',
     component:NewFeedComponent
   }
 ]


@NgModule({
  declarations: [
    NewFeedComponent, 
    
  ],
  imports: [
    RouterModule.forChild(routes),
    PostModule,
   
  ],
})
export class NewFeedModule { }

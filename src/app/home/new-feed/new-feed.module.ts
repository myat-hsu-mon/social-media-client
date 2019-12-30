import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFeedComponent } from './new-feed.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from '../post/post.component';
 const routes :Routes =[
   {
     path:'',
     component:NewFeedComponent
   }
 ]


@NgModule({
  declarations: [
    NewFeedComponent,
    PostComponent

    
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
   
  ],
 // exports:[NewfeedsComponent]
})
export class NewFeedModule { }

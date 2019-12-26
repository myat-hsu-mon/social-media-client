import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFeedComponent } from './new-feed.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { Routes, RouterModule } from '@angular/router';
import { NewfeedsComponent } from '../newfeeds/newfeeds.component';
 const routes :Routes =[
   {
     path:'',
     component:NewFeedComponent
   }
 ]


@NgModule({
  declarations: [
    NewFeedComponent,
    NewfeedsComponent

    
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

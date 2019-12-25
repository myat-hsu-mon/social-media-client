import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
//import { NewFeedModule } from '../new-feed/new-feed.module';
import { NewfeedsComponent } from '../newfeeds/newfeeds.component';
const routes:Routes =[
  {
    path:"",
    component:ProfileComponent
  }
]



@NgModule({
  declarations: [
    ProfileComponent,
    NewfeedsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
   // NewFeedModule,
  ],
  exports:[RouterModule]
})
export class ProfileModule { }

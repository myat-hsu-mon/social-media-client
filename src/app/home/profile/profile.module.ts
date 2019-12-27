import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { WallComponent } from '../wall/wall.component';
//import { NewFeedModule } from '../new-feed/new-feed.module';
const routes:Routes =[
  {
    path:"",
    component:ProfileComponent
  }
]



@NgModule({
  declarations: [
    ProfileComponent,
    WallComponent
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),

  ],
  exports:[RouterModule]
})
export class ProfileModule { }

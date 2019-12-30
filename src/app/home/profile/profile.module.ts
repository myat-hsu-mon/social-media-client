import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { PostModule } from '../shared-modules/post/post.module';
import { MaterialModule } from 'src/app/material/material.module';
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
  
  ],
  imports: [
    PostModule,
    RouterModule.forChild(routes),

  ],
  exports:[RouterModule]
})
export class ProfileModule { }

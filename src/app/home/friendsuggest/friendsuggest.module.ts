import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsuggestComponent } from './friendsuggest.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
const routes:Routes=[
  {
    path:'',
    component:FriendsuggestComponent
  }
]



@NgModule({
  declarations: [
    FriendsuggestComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[FriendsuggestComponent]
})
export class FriendsuggestModule { }

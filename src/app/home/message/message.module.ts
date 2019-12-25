import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { Routes, RouterModule } from '@angular/router';
const routes:Routes =[
  {
    path:'',
    component:MessageComponent
  }
]


@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class MessageModule { }

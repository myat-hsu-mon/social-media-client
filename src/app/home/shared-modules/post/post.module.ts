import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    PostComponent,
    FormsModule,
    CommonModule,
    MaterialModule
  ]
})
export class PostModule { }

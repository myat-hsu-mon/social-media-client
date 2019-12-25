import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes:Routes = [
  {
    path:"",
    component:SearchComponent
  }
]


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    NgbModule
  ],
  
  exports:[RouterModule]
})
export class SearchModule { }

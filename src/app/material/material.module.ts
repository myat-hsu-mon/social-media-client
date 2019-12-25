import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatIconModule, MatDialogModule, MatDividerModule, MatChipsModule,} from '@angular/material';
const material =[
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule, 
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatDividerModule,
  MatChipsModule,
  
  

];



@NgModule({

  imports: [material ],
  exports: [material ]
})
export class MaterialModule { }

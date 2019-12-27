import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatIconModule, MatDialogModule, MatDividerModule, MatChipsModule, MatBadgeModule,} from '@angular/material';
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
  MatBadgeModule

];



@NgModule({

  imports: [material ],
  exports: [material ]
})
export class MaterialModule { }

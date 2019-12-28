import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatIconModule, MatDialogModule, MatDividerModule, MatChipsModule, MatBadgeModule, MatListModule, MatBottomSheetModule,} from '@angular/material';
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
  MatBadgeModule,
  MatListModule,
  MatBottomSheetModule,


];



@NgModule({

  imports: [material ],
  exports: [material ]
})
export class MaterialModule { }

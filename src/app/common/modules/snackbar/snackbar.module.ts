import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { SnackbarService } from '../../services/snackbar.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SnackbarComponent
  ],
  providers: [
    SnackbarService
  ],
  exports: [
    SnackbarComponent
  ]
})
export class SnackbarModule { }

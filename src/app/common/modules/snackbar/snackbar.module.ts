import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../../utilities/snackbar/snackbar.component';
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

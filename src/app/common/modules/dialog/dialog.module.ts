import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from '../../utilities/dialog/dialog.component';
import { DialogDirective } from '../../utilities/dialog/dialog.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent,
    DialogDirective
  ],
  exports: [
    DialogComponent,
    DialogDirective
  ]
})
export class DialogModule { }

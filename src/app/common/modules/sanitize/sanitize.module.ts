import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanitizePipe } from '../../pipes/sanitize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SanitizePipe
  ],
  exports: [
    SanitizePipe
  ]
})
export class SanitizeModule { }

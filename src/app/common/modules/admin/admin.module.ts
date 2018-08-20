import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../../pages/login/login.component';
import { AdminComponent } from '../../../pages/admin/admin.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, AdminComponent]
})
export class AdminModule { }

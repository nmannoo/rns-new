import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { AdminComponent } from '../../../pages/admin/admin.component';
import { AdminLayoutComponent } from '../../layout/admin/admin-layout.component';
import { AdminHeaderComponent } from '../../layout/admin/admin-header/admin-header.component';
import { AdminFooterComponent } from '../../layout/admin/admin-footer/admin-footer.component';
import { ProductsComponent } from '../../../pages/admin/products/products.component';
import { PagesComponent } from '../../../pages/admin/pages/pages.component';
import { SlidersComponent } from '../../../pages/admin/sliders/sliders.component';

import { DialogModule } from '../dialog/dialog.module';
import { SortPipe } from '../../pipes/sort.pipe';
import { LoadingModule } from '../loading/loading.module';
import { FirecoreModule } from '../firecore/firecore.module';

import { AuthGuard } from '../../guard/auth.guard';
import { SnackbarModule } from '../snackbar/snackbar.module';
import { SanitizePipe } from '../../pipes/sanitize.pipe';
import { UsersComponent } from '../../../pages/admin/users/users.component';


const adminroutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'pages',
        component: PagesComponent
      },
      {
        path: 'sliders',
        component: SlidersComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminroutes),
    FirecoreModule,
    CdkTableModule,
    DialogModule,
    LoadingModule,
    SnackbarModule
  ],
  declarations: [
    AdminComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    ProductsComponent,
    SortPipe,
    PagesComponent,
    SlidersComponent,
    SanitizePipe,
    UsersComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AdminModule { }

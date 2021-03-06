import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './common/layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProdcatComponent } from './pages/prodcat/prodcat.component';
import { RegionalMarketComponent } from './pages/regional-market/regional-market.component';
import { GlossaryComponent } from './pages/glossary/glossary.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './common/modules/login/login.module#LoginModule',
    data: {
      state: 'login'
    }
  },
  {
    path: 'admin',
    loadChildren: './common/modules/admin/admin.module#AdminModule',
    data: {
      state: 'admin'
    }
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          state: 'home'
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          state: 'about'
        }
      },
      {
        path: ':parent/:child',
        component: ProdcatComponent
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          state: 'contact'
        }
      },
      {
        path: 'regional-market',
        component: RegionalMarketComponent,
        data: {
          state: 'regional-market'
        }
      },
      {
        path: 'glossary',
        component: GlossaryComponent,
        data: {
          state: 'glossary'
        }
      },
    ]
  },
  {
    path: '*',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

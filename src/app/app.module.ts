import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './common/layout/layout.component';
import { HeaderComponent } from './common/layout/header/header.component';
import { FooterComponent } from './common/layout/footer/footer.component';
import { SliderComponent } from './common/slider/slider.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EmptyRouterLinkDirective } from './common/directive/emptyrouterlink.directive';
import { SliderCardComponent } from './common/slider-card/slider-card.component';
import { ProdcatComponent } from './pages/prodcat/prodcat.component';
import { RegionalMarketComponent } from './pages/regional-market/regional-market.component';
import { GlossaryComponent } from './pages/glossary/glossary.component';
import { SwipeDirective } from './common/directive/swipe.directive';
import { DropdownDirective } from './common/directive/dropdown.directive';
import { FilterPipe } from './common/pipes/filter.pipe';
import { DropdownComponent } from './common/layout/header/dropdown/dropdown.component';
import { DialogModule } from './common/modules/dialog/dialog.module';
import { LoadingModule } from './common/modules/loading/loading.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    EmptyRouterLinkDirective,
    SliderCardComponent,
    ProdcatComponent,
    RegionalMarketComponent,
    GlossaryComponent,
    SwipeDirective,
    DropdownDirective,
    FilterPipe,
    DropdownComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-rns' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'rollnsheet'),
    AngularFirestoreModule.enablePersistence(),
    HttpClientModule,
    NgcCookieConsentModule.forRoot(<NgcCookieConsentConfig>environment.cookieConfig),
    DialogModule,
    LoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

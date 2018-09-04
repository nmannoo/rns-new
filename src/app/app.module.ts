import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

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
import { FirecoreModule } from './common/modules/firecore/firecore.module';
import { LinkmapComponent } from './common/linkmap/linkmap.component';

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
    DropdownComponent,
    LinkmapComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-rns' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FirecoreModule,
    HttpClientModule,
    NgcCookieConsentModule.forRoot(<NgcCookieConsentConfig>environment.cookieConfig),
    DialogModule,
    LoadingModule,
    NgxCaptchaModule.forRoot({
      reCaptcha2SiteKey: environment.reCAPTCHA.siteKey
    }),
    LazyLoadImagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

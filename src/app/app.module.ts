import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from "@app/app-routing.module";
import {AppComponent} from "@app/app.component";
import {AlertComponent} from "@app/_components/alert.component";
import {HomeComponent} from "@app/modules/home/home.component";
import {AccountService} from "@app/_services/account.service";
import {appInitializer} from "@app/_helpers/app.initializer";
import {MenuModule} from "@app/modules/menu/menu.module";
import {JwtInterceptor} from "@app/_helpers/jwt.interceptor";
import {ErrorInterceptor} from "@app/_helpers/error.interceptor";

// used to create fake backend
import { fakeBackendProvider } from '@app/_helpers/fake-backend';
import {FooterModule} from "@app/modules/footer/footer.module";
import {CurrentstatusModule} from "@app/modules/currentstatus/currentstatus.module";
import { ImprintComponent } from './modules/imprint/components/imprint/imprint.component';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MenuModule,
    FooterModule,
    CurrentstatusModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    ImprintComponent
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {enableProdMode, APP_INITIALIZER, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {fakeBackendProvider} from '@app/_helpers/fake-backend';
import {ErrorInterceptor} from '@app/_helpers/error.interceptor';
import {JwtInterceptor} from '@app/_helpers/jwt.interceptor';
import {HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient} from '@angular/common/http';
import {AccountService} from '@app/_services/account.service';
import {appInitializer} from '@app/_helpers/app.initializer';
import {provideRouter} from '@angular/router';
import {APP_ROUTES} from '@app/app.routes';
import {UtcVitisBackend} from "@app/_services/utc-vitis-backend";
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeDe);

bootstrapApplication(AppComponent, {
  providers: [
    {provide: LOCALE_ID, useValue: 'de-DE'},
    {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService]},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UtcVitisBackend, multi: true},
    fakeBackendProvider,
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES)

  ]
})
  .catch(err => console.error(err));

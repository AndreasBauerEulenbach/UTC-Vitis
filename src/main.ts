import { enableProdMode, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { fakeBackendProvider } from '@app/_helpers/fake-backend';
import { ErrorInterceptor } from '@app/_helpers/error.interceptor';
import { JwtInterceptor } from '@app/_helpers/jwt.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AccountService } from '@app/_services/account.service';
import { appInitializer } from '@app/_helpers/app.initializer';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      // provider used to create fake backend
      fakeBackendProvider,
      provideHttpClient(withInterceptorsFromDi()),
      provideRouter(APP_ROUTES)
]
})
  .catch(err => console.error(err));

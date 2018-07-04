/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

//modules
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//icons library
import { faPencilAlt, faSyncAlt } from '@fortawesome/fontawesome-free-solid';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faPencilAlt);
fontawesome.library.add(faSyncAlt);

// Services
import { TranscriptionTimetrackerService } from './shared/services/transcription-timetracker-service';
import { DataService } from './shared/services/data.service';
import { UploadService } from './shared/services/upload.service';
import { SessionService } from './shared/services/session.service';
import { PreventLogInService } from './shared/services/prevent-log-in.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AuthService } from './shared/services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './shared/services/token.interceptor';
import { RoleGuardService } from './shared/services/roleGuard.service';
import { LoginService } from './shared/services/login.service';

export function gettoken() {
  return localStorage.getItem('token');
};

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: gettoken,
        whitelistedDomains: ['localhost:4200', 'https://d3codgzuy94wwm.cloudfront.net', 'https://d1542gx2ogz2qv.cloudfront.net']
      }
    }),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [LoginService,UploadService, TranscriptionTimetrackerService, DataService, SessionService, AuthGuardService, PreventLogInService, AuthService,RoleGuardService,
    { provide: APP_BASE_HREF, useValue: '/' },{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class AppModule {
}

import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
// import * as Sentry from '@sentry/browser';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { BackgroundFetch, BackgroundFetchConfig } from '@ionic-native/background-fetch/ngx';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirePerformanceModule } from '@angular/fire/performance';



// Sentry.init({
//   dsn: 'https://50d69d1d58a048fa9e4ad726b409de86@sentry.io/5177920'
// });

// @Injectable()
// export class SentryErrorHandler implements ErrorHandler {
//   constructor() {

//   }

//   handleError(error) {
//     const eventId = Sentry.captureException(error.originalError || error);
//     Sentry.showReportDialog({ eventId });
//   }
// }

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js',
    { enabled: environment.production }),
    JwSocialButtonsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirePerformanceModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // SentryErrorHandler,
    LocalNotifications,
    BackgroundMode,
    BackgroundFetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

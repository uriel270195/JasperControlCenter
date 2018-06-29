import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginIonic } from '../pages/login/login-ionic';
import { loginService } from '../services/login.service';
import { ControlCenter } from '../pages/control-center/control-center';
import { SimCard } from '../pages/sim-card/sim-card';
import { SimCadService } from '../services/sim-card.service';
import { InfoSim } from '../pages/info-sim/info-sim';
import { LocalNotifications } from "@ionic-native/local-notifications";

@NgModule({
  declarations: [
    MyApp,
    LoginIonic,
    ControlCenter,
    SimCard,
    InfoSim
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginIonic,
    ControlCenter,
    SimCard,
    InfoSim
  ],
  providers: [
    StatusBar,
    SplashScreen,
    loginService,
    SimCadService,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ComponentsModule } from './components/components.module';
import { PushModalComponent } from './components/push-modal/push-modal.component';
import { EventModalComponent } from './components/event-modal/event-modal.component';
import { AddEventComponent } from './components/add-event/add-event.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    PushModalComponent,
    EventModalComponent,
    AddEventComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

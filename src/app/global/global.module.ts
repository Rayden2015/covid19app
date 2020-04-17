import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GlobalPageRoutingModule } from './global-routing.module';
import { GlobalPage } from './global.page';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalPageRoutingModule,
    JwSocialButtonsModule
  ],
  providers: [
    LocalNotifications
  ],
  declarations: [GlobalPage]
})
export class GlobalPageModule {}

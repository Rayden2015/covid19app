import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule,
    JwSocialButtonsModule
  ],
  declarations: [PostsPage]
})
export class PostsPageModule {}

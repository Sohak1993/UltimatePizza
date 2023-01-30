import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileDisplayComponent } from './components/profile-display/profile-display.component';
import { containers } from '../profile/containers';


@NgModule({
  declarations: [
    ...containers

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { GeolocationSitesComponent } from './geolocation-sites/geolocation-sites.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AdminUserComponent } from './admin-user/admin-user.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    GeolocationSitesComponent,
    AdminUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }

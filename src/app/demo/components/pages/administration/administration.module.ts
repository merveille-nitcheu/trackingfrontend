import { NgModule } from '@angular/core';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { GeolocationSitesComponent } from './geolocation-sites/geolocation-sites.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { RolesComponent } from './roles/roles.component';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';



@NgModule({
  declarations: [
    AdministrationComponent,
    GeolocationSitesComponent,
    AdminUserComponent,
    RolesComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule,
    StepperModule,
    InputIconModule,
    IconFieldModule,
    ToggleButtonModule,
    InputTextModule,
    ButtonModule,
    StepsModule
  ]
})
export class AdministrationModule { }

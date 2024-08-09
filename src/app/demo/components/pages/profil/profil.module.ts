import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { UserParametersComponent } from './user-parameters/user-parameters.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AppParametersComponent } from './app-parameters/app-parameters.component';


@NgModule({
  declarations: [
    DeconnexionComponent,
    UserParametersComponent,
    AppParametersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfilRoutingModule
  ]
})
export class ProfilModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { UserParametersComponent } from './user-parameters/user-parameters.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';


@NgModule({
  declarations: [
    DeconnexionComponent,
    UserParametersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfilRoutingModule
  ]
})
export class ProfilModule { }

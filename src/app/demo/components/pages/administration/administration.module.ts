import { NgModule } from '@angular/core';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { GeolocationSitesComponent } from './geolocation-sites/geolocation-sites.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { RolesComponent } from './roles/roles.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { AssignRoleComponent } from './roles/assign-role/assign-role.component';
import { ConfirmationComponent } from './roles/confirmation/confirmation.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';


@NgModule({
    declarations: [
        AdministrationComponent,
        GeolocationSitesComponent,
        AdminUserComponent,
        RolesComponent,
        AddRoleComponent,
        AssignRoleComponent,
        ConfirmationComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AdministrationRoutingModule,
        InputTextModule,
        ButtonModule,
        StepsModule,
        CardModule,
        MultiSelectModule,
        DialogModule,
        ChipsModule
    ],
})
export class AdministrationModule {}

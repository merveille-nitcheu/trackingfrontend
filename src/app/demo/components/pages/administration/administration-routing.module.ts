import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeolocationSitesComponent } from './geolocation-sites/geolocation-sites.component';
import { NotfoundComponent } from '../../notfound/notfound.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { RolesComponent } from './roles/roles.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { AssignRoleComponent } from './roles/assign-role/assign-role.component';
import { ConfirmationComponent } from './roles/confirmation/confirmation.component';

const routes: Routes = [
    {
        path: 'geolocation-site',
        component: GeolocationSitesComponent,
    },
    {
        path: 'admin-user',
        component: AdminUserComponent,
    },
    {
        path: 'roles',
        component: RolesComponent,
        children: [
            { path: 'add_role', component: AddRoleComponent },
            {
                path: 'assign_role',
                component: AssignRoleComponent,
            },
            {
                path: 'confirmation',
                component: ConfirmationComponent,
            },
            { path: '', redirectTo: 'add_role', pathMatch: 'full' },
        ],
    },
    {
        path: 'notfound',
        component: NotfoundComponent,
    },
    {
        path: '**',
        redirectTo: '/notfound',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministrationRoutingModule {}

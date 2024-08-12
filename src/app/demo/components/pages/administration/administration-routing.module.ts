import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeolocationSitesComponent } from './geolocation-sites/geolocation-sites.component';
import { NotfoundComponent } from '../../notfound/notfound.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
    {
        path: 'geolocation-site',
        component: GeolocationSitesComponent
    },
    {
        path: 'admin-user',
        component: AdminUserComponent
    },
    {
        path: 'roles',
        component: RolesComponent
    },
    {
        path: 'notfound',
        component: NotfoundComponent
    },
    {
        path: '**',
        redirectTo: '/notfound'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }

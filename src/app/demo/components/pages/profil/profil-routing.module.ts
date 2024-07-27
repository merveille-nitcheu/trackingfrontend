import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserParametersComponent } from './user-parameters/user-parameters.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { NotfoundComponent } from '../../notfound/notfound.component';

const routes: Routes = [
    {
        path: 'user-parameters',
        component: UserParametersComponent
    },
    {
        path: 'deconnexion',
        component: DeconnexionComponent
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
export class ProfilRoutingModule { }

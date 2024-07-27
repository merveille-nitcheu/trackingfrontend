import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'route-history',
            loadChildren: () => import('../pages/route-history/route-history.module').then(m => m.RouteHistoryModule)
        },
        {
            path: 'configuration',
            loadChildren: () => import('../pages/configuration/configuration.module').then(m => m.ConfigurationModule)
        },
        {
            path: 'administration',
            loadChildren: () => import('../pages/administration/administration.module').then(m => m.AdministrationModule)
        },
        {
            path: 'profil',
            loadChildren: () => import('../pages/profil/profil.module').then(m => m.ProfilModule)
        },
        {
            path: 'notfound',
            component: NotfoundComponent
        },
        {
            path: '**',
            redirectTo: '/notfound'
        }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

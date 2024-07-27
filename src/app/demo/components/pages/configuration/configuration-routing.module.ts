import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../../notfound/notfound.component';
import { SitesComponent } from './sites/sites.component';
import { TrackerComponent } from './tracker/tracker.component';

const routes: Routes = [
    {
        path: 'site',
        component: SitesComponent
    },
    {
        path: 'tracker',
        component: TrackerComponent
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
export class ConfigurationRoutingModule { }

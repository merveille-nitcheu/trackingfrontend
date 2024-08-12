import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../../notfound/notfound.component';
import { SitesComponent } from './sites/sites.component';
import { TrackerComponent } from './tracker/tracker.component';
import { MarkerComponent } from './marker/marker.component';
import { ZoomComponent } from './zoom/zoom.component';

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
        path: 'marker',
        component: MarkerComponent
    },
    {
        path: 'zoom',
        component: ZoomComponent
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

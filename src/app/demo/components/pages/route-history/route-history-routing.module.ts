import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteHistoryComponent } from './route-history.component';

const routes: Routes = [
    {
        path: '',
        component: RouteHistoryComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteHistoryRoutingModule { }

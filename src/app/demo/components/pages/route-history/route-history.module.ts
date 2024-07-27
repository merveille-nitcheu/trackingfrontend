import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteHistoryRoutingModule } from './route-history-routing.module';
import { RouteHistoryComponent } from './route-history.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';


@NgModule({
  declarations: [
    RouteHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouteHistoryRoutingModule
  ]
})
export class RouteHistoryModule { }

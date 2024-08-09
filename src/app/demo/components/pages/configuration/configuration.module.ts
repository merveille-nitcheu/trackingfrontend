import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from "primeng/inputtextarea";
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { SitesComponent } from './sites/sites.component';
import { TrackerComponent } from './tracker/tracker.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';


@NgModule({
  declarations: [
    SitesComponent,
    TrackerComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConfigurationRoutingModule,
    InputTextareaModule
  ]
})
export class ConfigurationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from "primeng/inputtextarea";
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { SitesComponent } from './sites/sites.component';
import { TrackerComponent } from './tracker/tracker.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from "primeng/floatlabel"
import { MarkerComponent } from './marker/marker.component';
import { OrderListModule } from 'primeng/orderlist';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ZoomComponent } from './zoom/zoom.component';


@NgModule({
  declarations: [
    SitesComponent,
    TrackerComponent,
    ConfigurationComponent,
    MarkerComponent,
    ZoomComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConfigurationRoutingModule,
    InputTextareaModule,
    DropdownModule,
    FloatLabelModule,
    OrderListModule,
    ColorPickerModule
  ]
})
export class ConfigurationModule { }

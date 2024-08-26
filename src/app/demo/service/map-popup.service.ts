import { Injectable } from '@angular/core';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class MapPopupService {

  constructor(

  ) { }


  convertBattery(battery: any) {
    return battery; // Round to 2 decimal places
  }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div>Reference: ${ data.ref }</div>` +
      `<div style="background-color:${ data.backColor}">Batterie: ${ this.convertBattery(data.bat) }</div>` +
      `<div>Date et Heure: ${ data.hour }</div>`;
  }

  makeSitePopup(data: any): string {
    return `` +
      `<div>Name: ${ data.name }</div>` +
      `<div>Description: ${ data.description }</div>` +
      `<div>Nbre traqueurs: ${ data.numT }</div>`;
  }
}

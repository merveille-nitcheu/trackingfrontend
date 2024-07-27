import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapPopupService {

  constructor() { }
  makeCapitalPopup(data: any): string {
    return `` +
      `<div>Reference: ${ data.ref }</div>` +
      `<div style="background-color:${ data.backColor}">Batterie: ${ data.bat }</div>` +
      `<div>Date et Heure: ${ data.hour }</div>`;
  }

  makeSitePopup(data: any): string {
    return `` +
      `<div>Name: ${ data.name }</div>` +
      `<div>Description: ${ data.description }</div>` +
      `<div>Nbre traqueurs: ${ data.numT }</div>`;
  }
}

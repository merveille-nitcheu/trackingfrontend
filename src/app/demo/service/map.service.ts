import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as utility from '../utilities/utility';
import { MapPopupService } from './map-popup.service';
import { environment } from 'src/environments/environment';

const iconRetinaUrl = 'assets/marker-icon-2x-green.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
/* const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); */
//L.Marker.prototype.options.icon = iconDefault;
const redIcon = L.icon({
    iconUrl: 'assets/marker-icon-2x-red.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
const redMarker = L.icon({
    iconUrl: 'assets/marker-icon-2x-red.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
    iconColor: '#FF0000' // Couleur rouge
});

const orangeMarker = L.icon({
    iconUrl: 'assets/marker-icon-2x-orange.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
    iconColor: 'orange'
});

const greenMarker = L.icon({
    iconUrl: 'assets/marker-icon-2x-green.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
    iconColor: '#00FF00' // Couleur verte
});
// const color = '23c42121'

const blackMarker = L.icon({
    iconUrl: 'assets/marker-icon-2x-black.png',
    // iconUrl: `https://api.geoapify.com/v1/icon?type=awesome&color=%${color}&size=x-large&icon=paw&noWhiteCircle=true&scaleFactor=2&apiKey=92464d65fcd34cb09df03891cab83a8d`,
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
    iconColor: '#FFFFF' // Couleur verte
});

//L.Marker.prototype.options.icon = greenMarker;


@Injectable({
  providedIn: 'root'
})
export class MapService {

    constructor(private mapPopupService: MapPopupService,private http: HttpClient) { }

    addTrackerToMap(listLastRecordTracker:any[], map:L.map, circle:any){
        let listMarkerOutZone:any[] = [];
        let listSensorOutZone:any[] = [];
        let listMarkerZone:any[] = [];
        listLastRecordTracker.forEach((tracker)=>{
            if(tracker.sensor_records.length > 0){
                const lon = tracker.sensor_records[0].longitude;
                const lat = tracker.sensor_records[0].latitude;
                const marker = L.marker([lat, lon],{
                    icon: this.getTheGoodMarker(Number(this.convertBattery(tracker.sensor_records[0].battery)), tracker.sensor_records[0].created_at)
                });
                let popupData = {
                    bat: tracker.sensor_records[0].battery,
                    ref: tracker.sensor_reference,
                    hour: utility.toLocalDateTime(tracker.sensor_records[0].created_at),
                    backColor: this.getTheBackgroundColorPopup(Number(this.convertBattery(tracker.sensor_records[0].battery)))
                };
                marker.bindPopup(this.mapPopupService.makeCapitalPopup(popupData));
                marker.on('mouseover', () => {
                    marker.bindPopup(this.mapPopupService.makeCapitalPopup(popupData)).openPopup();
                });
                marker.addTo(map);
                this.blinkMarker(marker, Number(tracker.sensor_records[0].battery));
                if(this.isMarkerInCircle(circle, marker)===false){
                    listMarkerOutZone.push(marker);
                    listSensorOutZone.push(tracker);
                }
                listMarkerZone.push({
                    marker: marker,
                    record: tracker
                });
            }
        });
        return {
            marker: listMarkerOutZone,
            sensor: listSensorOutZone,
            mapMarker: listMarkerZone
        };
    }

    addAllTrackerToMap(listLastRecordTracker:any[], listAllMarker:any[], circle:any){
        let listMarkerOutZone:any[] = [];
        let listSensorOutZone:any[] = [];
        let listMarkerZone:any[] = [];
        for (let i = 0; i < listLastRecordTracker.length; i++) {
            const tracker = listLastRecordTracker[i];
            for (let j = 0; j < listAllMarker.length; j++) {
                let marker = listAllMarker[j];
                if(marker?.record?.sensor_records?.length >0 && marker.record.sensor_records[0].sensor_id == tracker.id){
                    marker = this.updateTrackerToMap(tracker, marker.marker);
                    if(this.isMarkerInCircle(circle, marker)===false){
                        listMarkerOutZone.push(marker);
                        listSensorOutZone.push(tracker);
                    }
                    listMarkerZone.push({
                        marker: marker,
                        record: tracker
                    });
                }
                listAllMarker[j]=marker;
            }
        }
        return {
            marker: listMarkerOutZone,
            sensor: listSensorOutZone,
            mapMarker: listMarkerZone
        };
    }



    updateTheLists(listLastRecordTracker:any[], circle:any){
        let listMarkerOutZone:any[] = [];
        let listSensorOutZone:any[] = [];
        let listMarkerZone:any[] = [];
        listLastRecordTracker.forEach((tracker)=>{
            if(tracker.sensor_records.length > 0){
                const lon = tracker.sensor_records[0].longitude;
                const lat = tracker.sensor_records[0].latitude;
                const marker = L.marker([lat, lon]);
                //marker.addTo(map);
                //this.blinkMarker(marker, Number(tracker.sensor_records[0].battery));
                if(this.isMarkerInCircle(circle, marker)===false){
                    listMarkerOutZone.push(marker);
                    listSensorOutZone.push(tracker);
                }
                listMarkerZone.push({
                    marker: marker,
                    record: tracker
                });
            }
        });
        return {
            marker: listMarkerOutZone,
            sensor: listSensorOutZone,
            mapMarker: listMarkerZone
        };
    }

    addNotification(usefullData: any){
        return this.http.post<any>(environment.apiUrl+'/sensor/add-notification', usefullData);
    }

    updateTrackerToMap(tracker:any, marker:any){
        const lon = tracker.sensor_records[0].longitude;
        const lat = tracker.sensor_records[0].latitude;
        marker.setIcon(this.getTheGoodMarker(Number(this.convertBattery(tracker.sensor_records[0].battery)), tracker.sensor_records[0].created_at));
        marker.setLatLng([lat, lon]);
        let popupData = {
            bat: tracker.sensor_records[0].battery,
            ref: tracker.sensor_reference,
            hour: utility.toLocalDateTime(tracker.sensor_records[0].created_at),
            backColor: this.getTheBackgroundColorPopup(Number(tracker.sensor_records[0].battery))
        };
        marker.bindPopup(this.mapPopupService.makeCapitalPopup(popupData)).openPopup();
        marker.on('mouseover', () => {
            marker.bindPopup(this.mapPopupService.makeCapitalPopup(popupData)).openPopup();
        });
        this.blinkMarker(marker, Number(tracker.sensor_records[0].battery));
        return marker;
    }

    convertBattery(battery: any) {
        return battery; // Round to 2 decimal places
      }

    addCircleWithRadiusToMap(site:any, map:L.map){
        let circle = L.circle([site.latitude, site.longitude], {
            color: 'green',
            fillColor: '#ADD8E6',
            fillOpacity: 0.5,
            radius: site.radius // 500 mètres de rayon
        }).addTo(map);
        return circle;
    }

    addManyCircleWithRadiusToMap(listSensorRecords:any, map:L.map){
        let listMarkerCircle:any[] = [];
        listSensorRecords.forEach((sensorRecord: any, i:number) => {
            // let circle = L.circle([sensorRecord.latitude, sensorRecord.longitude], {
            //     color: '#FF0000',
            //     radius: 0.05 // Rayon de 50 km
            // });
            let numberIcon = L.divIcon({
                className: 'number-icon', // Classe CSS pour le style
                html: `<div style="color: red; font-weight: meduim; font-size: 8px;">${i + 1}</div>`, // Affiche le numéro

            });
            let popupData = {
                bat: sensorRecord.battery,
                ref: sensorRecord.sensor.sensor_reference+" Position: "+(i+1),
                hour: utility.toLocalDateTime(sensorRecord.created_at),
                backColor: this.getTheBackgroundColorPopup(Number(sensorRecord.battery))
            };
            let number = L.marker([sensorRecord.latitude, sensorRecord.longitude], { icon: numberIcon }).addTo(map);
            // circle.addTo(map);
            number.bindPopup(this.mapPopupService.makeCapitalPopup(popupData)).openPopup();
            number.on('mouseover', () => {
                number.bindPopup(this.mapPopupService.makeCapitalPopup(popupData)).openPopup();
            });
            listMarkerCircle.push({
                circle: number,
                record: sensorRecord
            });
        });
        return listMarkerCircle;
    }

    addCircleWithRadiusWithMarkerToMap(site:any, map:L.map){
        let circleWithListMarkers:any = {};
        let listMarkers:any[] = [];
        let circle = L.circle([site.latitude, site.longitude], {
            color: 'green',
            radius: site.radius // Rayon de 50 km
        });
        let popupData = {
            name: site.name,
            description: site.description,
            numT: site.sensors.length
        };
        circle.addTo(map);
        circle.bindPopup(this.mapPopupService.makeSitePopup(popupData)).openPopup();
        circle.on('mouseover', () => {
            circle.bindPopup(this.mapPopupService.makeSitePopup(popupData)).openPopup();
        });
        if(site.sensors.length > 0){
            let listSensors:any[] = site.sensors;
            listSensors.forEach((sensors:any, index:number)=>{
                let marker:any = null;
                if(sensors.sensor_records.length > 0){
                    //console.log("sensors.sensor_records: ",sensors.sensor_records.length);
                    let lastRecord = sensors.sensor_records[0];
                    const lon = lastRecord.longitude;
                    const lat = lastRecord.latitude;
                    marker = L.marker([lat, lon],{
                        icon: this.getTheGoodMarker(Number(this.convertBattery(lastRecord.battery)), lastRecord.created_at)
                    });
                    let popupData = {
                        bat: lastRecord.battery,
                        ref: sensors.sensor_reference,
                        hour: utility.toLocalDateTime(lastRecord.created_at),
                        backColor: this.getTheBackgroundColorPopup(Number(lastRecord.battery))
                    };
                    marker.bindPopup(this.mapPopupService.makeCapitalPopup(popupData));
                    marker.on('mouseover', () => {
                        marker.bindPopup(this.mapPopupService.makeCapitalPopup(popupData)).openPopup();
                    });
                    marker.addTo(map);
                    this.blinkMarker(marker, Number(lastRecord.battery));
                }
                listMarkers.push(marker);
            });
        }
        circleWithListMarkers = {
            circle: circle,
            listMarkers: listMarkers
        };
        return circleWithListMarkers;
    }

    getTheGoodMarker(battery:number, cDate:string){
        if(utility.isToday(cDate)===false){
            return blackMarker;
        }else{
            if(battery <= 20){
                return redMarker;
            }else if(battery > 20 && battery < 50){
                return orangeMarker;
            }else{
                return greenMarker;
            }
        }

    }

    getTheBackgroundColorPopup(battery:number){
        if(battery <= 20){
            return "#FFCDD2";
        }else if(battery > 20 && battery < 50){
            return "#FFF3E0";
        }else{
            return "#E0FFE0";
        }
    }

    blinkMarker(marker:any, battery: number) {
        if(battery <= 20){
            var isVisible = true;
            var interval = setInterval(function() {
                if (isVisible) {
                    marker.setOpacity(0.3); // Rendre le marqueur plus transparent
                } else {
                    marker.setOpacity(1); // Rendre le marqueur à pleine opacité
                }
                isVisible = !isVisible;
            }, 500); // Changer l'opacité toutes les 500 millisecondes (0,5 seconde)
        }
    }



    isMarkerInCircle(circle:any, marker:any) {
        let markerLatLng = marker.getLatLng();
        let circleLatLng = circle.getLatLng();
        let radius = circle.getRadius();
        //console.log("circle radius: ", radius);
        // Calculer la distance entre le marqueur et le centre du cercle
        let distance = markerLatLng.distanceTo(circleLatLng);

        if (distance <= radius) {
            //console.log('Le marqueur se trouve dans le cercle');
            return true;
        } else {
            //console.log('Le marqueur ne se trouve pas dans le cercle');
            return false;
        }
    }




}

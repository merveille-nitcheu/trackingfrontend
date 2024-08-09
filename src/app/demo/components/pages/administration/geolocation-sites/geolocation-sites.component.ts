import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { SensorService } from 'src/app/demo/service/sensor.service';
import { SiteService } from 'src/app/demo/service/site.service';
import { UserSiteService } from 'src/app/demo/service/user-site.service';
import * as utility from '../../../../utilities/utility';
import * as L from 'leaflet';
import { MapService } from 'src/app/demo/service/map.service';

@Component({
  selector: 'app-geolocation-sites',
  templateUrl: './geolocation-sites.component.html',
  styleUrl: './geolocation-sites.component.scss'
})
export class GeolocationSitesComponent {
    user!: any;
    listSites: any[]=[];
    site:any = {};
    selectedSite:any = {};
    selectedMarkerSite:any = {};

    listSensors!: any[];
    sensor!:any;
    submittedSensor:boolean = false;
    sensorDialog :boolean= false;

    dialogSensorsTitle:string = "";
    dialogSensorsvisible:boolean = false;

    dialogLastSensorRecordTitle:string = "";
    lastSensorRecordDialog:boolean = false;
    lastSensorRecord:any = {};

    circle!:any;
    map!:any;
    listCoordinates:any[];
    listSiteMarkers:any[]=[];
    listCurentSiteSensorMarker:any[]=[];

    constructor(public authService: AuthService,
        public userSiteService: UserSiteService,
        public sensorService: SensorService,
        public messageService: MessageService,
        public siteService: SiteService,
        public confirmationService: ConfirmationService,
        public mapService: MapService
    ) { }

    ngOnInit(){
        this.user = this.authService.getUser();
        console.log("user: ", this.user);
        this.getListSite();
    }

    getListSite(){
        this.siteService.getListSitesForUser().subscribe((res)=>{
            if(res.success == true){
                this.listSites = res.data.list_sites;
                this.listSiteMarkers = this.initMap();
                this.messageService.add(
                    { severity: 'success', summary: 'Successful', detail: res.msg, life: 3000 }
                );
                console.log("list site: ", this.listSites);
            }else{
                this.messageService.add(
                    { severity: 'error', summary: 'Erreur', detail: res.msg, life: 3000 }
                );
            }
        });
    }

    getListSensorBySiteId(){
        this.sensorService.getListSensorsBySiteId({
            site_id: this.selectedSite.id
        }).subscribe((res)=>{
            if(res.success == true){
                console.log("res: ", res.data);
                this.listSensors = res.data.list_sensors;
                this.messageService.add(
                    { severity: 'success', summary: 'Successful', detail: res.msg, life: 3000 }
                );
            }else{
                this.messageService.add(
                    { severity: 'error', summary: 'Erreur', detail: res.msg, life: 3000 }
                );
            }
        });
    }

    showListSensors(site: any, index:number){
        console.log("site: ", site);
        this.selectedSite = site;
        this.selectedMarkerSite = this.listSiteMarkers[index];
        this.dialogSensorsTitle = "Liste des traqueurs";
        if(site.sensors && site.sensors.length > 0){
            this.listSensors = site.sensors;
        }else{
            this.listSensors = [];
        }
        this.dialogSensorsvisible = true;
    }

    private initMap(): any[] {
        let listSiteMarkerWithMarkers:any[] = [];
        let listCircleMarker:any[] = [];
        if(this.map != null){
            this.map.remove();
        }
        this.map = L.map('map', {
            center: [ 13.23, 9.3],
            zoom: 10
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        this.map.zoomControl.setPosition('bottomright');
        tiles.addTo(this.map);
        this.listSites.forEach((site:any, index:number)=>{
            let siteMarker = this.mapService.addCircleWithRadiusWithMarkerToMap(site, this.map);
            listSiteMarkerWithMarkers.push(siteMarker);
            listCircleMarker.push(siteMarker.circle);
        });

        if(listCircleMarker.length > 0){
            const bounds = L.latLngBounds(listCircleMarker.map(marker => marker.getLatLng()));
            console.log("bounds: ",bounds);
            this.map.fitBounds(bounds);
        }

        this.messageService.add(
            {
                severity: 'info',
                summary: 'Information',
                detail: "Map initialise avec succes"
            }
        );
        return listSiteMarkerWithMarkers;
    }

    centerTheMap(site:any, index:any){
        this.map.setView([site.latitude, site.longitude], 10);
        this.listSiteMarkers[index].circle.openPopup();
    }

    centerTheMarkerMap(sensor:any, index:any){
        if(sensor.sensor_records.length > 0){
            this.map.setView([sensor.sensor_records[0].latitude, sensor.sensor_records[0].longitude], 12);
            this.selectedMarkerSite.listMarkers[index].openPopup();
        }else{
            this.messageService.add(
                { severity: 'error', summary: 'Erreur', detail: "Aucune donnee pour ce traqueur", life: 3000 }
            );
        }
        //this.dialogSensorsvisible = false;
    }

  getContactResponsable(site: any): { nom: string; contact: string; email: string } {
  if (site.user_site) {

    return {
      nom: site.user_site.user?.email || 'Nom inconnu',
      contact: site.user_site.user?.contact || 'Contact inconnu',
      email: site.user_site.user?.email || 'Email inconnu',
    };
  } else {
    return {
      nom: 'Contact inconnu',
      contact: 'Contact inconnu',
      email: 'Email inconnu',
    };
  }
}

    showLastData(sensor:any){
        this.dialogLastSensorRecordTitle = sensor.sensor_reference;
        this.lastSensorRecordDialog = true;
        if(sensor.sensor_records && sensor.sensor_records.length > 0){
            this.lastSensorRecord = sensor.sensor_records[0];
        }else{
            this.lastSensorRecord = null;
        }
        console.log("sensor: ", sensor);
    }

    getLocalDateTime(d:string){
        return utility.toLocalDateTime(d);
    }

    getTableBatteryColor(bat:number){
        if(bat <= 20){
            return '#FFEFEF';
        }else if(bat > 20 && bat <= 50){
            return '#FFFAEF';
        }else{
            return '#EFFEFF';
        }
    }
}

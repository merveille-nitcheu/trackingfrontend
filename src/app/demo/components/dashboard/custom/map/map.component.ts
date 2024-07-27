import { ChangeDetectorRef, Component } from '@angular/core';
import * as L from 'leaflet';
import * as utility from '../../../../utilities/utility';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { MapService } from 'src/app/demo/service/map.service';
import { SensorService } from 'src/app/demo/service/sensor.service';
import { UserSiteService } from 'src/app/demo/service/user-site.service';
import { PusherService } from 'src/app/demo/service/pusher.service';
import { SiteService } from 'src/app/demo/service/site.service';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
    private map: any;
    user!:any;
    site!:any;
    circle!:any;
    listMarkerOutZone:any[] = [];
    listAllMarkerZone:any[] = [];
    listSensorOutZone:any[] = [];
    listSensors:any[] = [];
    listActifSensors:any[] = [];
    listLowBatSensors:any[] = [];
    listSensorsOnMap:any[] = [];
    listForTable:any[] = [];
    visible = false;
    tableTitle:string = "";
    lastEmitTable:boolean = false;
    sensorOnMapTable:boolean = false;
    loadingDropdownSite:boolean = false;

    listSites!: any[];



    constructor(public authService: AuthService,
                public userSiteService: UserSiteService,
                public sensorService: SensorService,
                public mapService: MapService,
                public messageService: MessageService,
                public pusherService: PusherService,
                public siteService: SiteService,
                private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(){
        this.user = this.authService.getUser();

    }

    ngAfterViewInit(): void {
        this.initMap();
        console.log("site after init: ", this.site);

    }


    private initMap(): void {
        this.siteService.getListSitesForUser().subscribe((res)=>{
            if(res.success == true){
                this.listSites = res.data.list_sites;
                if(this.listSites.length > 0){
                    this.site = this.listSites[0];
                    this.getListActifSensors();
                    this.map = L.map('map', {
                        center: [ this.site.latitude, this.site.longitude],
                        zoom: 10
                    });
                    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 18,
                        minZoom: 3,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    });
                    this.map.zoomControl.setPosition('bottomright');
                    tiles.addTo(this.map);
                    this.circle = this.mapService.addCircleWithRadiusToMap(this.site, this.map);
                    //list sensor with last record
                    let dmp = this.mapService.addTrackerToMap(this.site.sensors, this.map, this.circle);
                    this.listMarkerOutZone = dmp.marker;
                    this.listSensorOutZone = dmp.sensor;
                    this.listAllMarkerZone = dmp.mapMarker;
                    this.pusherService.bindEvent('record.sent', this.site.id, (res)=>{
                        console.log("pusher response: ",res);
                        this.updateMap(res);
                    });
                    this.messageService.add(
                        {
                            severity: 'info',
                            summary: 'Information',
                            detail: "Map initialise avec succes"
                        }
                    );
                }
                this.messageService.add(
                    {
                        severity: 'success',
                        summary: 'Information',
                        detail: res.msg
                    }
                );
            }else{
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Information',
                        detail: res.msg
                    }
                );
            }

        });
    }

    dropdrownSiteChangeFunction(event:any){
        this.loadingDropdownSite = true;
        this.site = event.value;
        //this.pusherService.unsubscribe();
        this.changeMapForNewSite();
        console.log("event dropdown: ", this.site);
    }

    private changeMapForNewSite(): void {
        this.map.remove();
        this.getListActifSensors();
        this.map = L.map('map', {
            center: [ this.site.latitude, this.site.longitude],
            zoom: 10
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        this.map.zoomControl.setPosition('bottomright');
        tiles.addTo(this.map);
        this.circle = this.mapService.addCircleWithRadiusToMap(this.site, this.map);
        //list sensor with last record
        let dmp = this.mapService.addTrackerToMap(this.site.sensors, this.map, this.circle);
        this.listMarkerOutZone = dmp.marker;
        this.listSensorOutZone = dmp.sensor;
        this.listAllMarkerZone = dmp.mapMarker;
        this.pusherService.bindEvent('record.sent', this.site.id, (res)=>{
            console.log("pusher response: ",this.listAllMarkerZone);
            this.updateMap(res);
        });
        this.loadingDropdownSite = false;
        this.messageService.add(
            {
                severity: 'info',
                summary: 'Information',
                detail: "Map chargée avec succes"
            }
        );
    }



    updateMap(res:any){
        this.listAllMarkerZone.forEach(marker => {
            this.map.removeLayer(marker.marker);
        });
        let dmp = this.mapService.addTrackerToMap(res.newRecord, this.map, this.circle);
        this.listMarkerOutZone = dmp.marker;
        this.listSensorOutZone = dmp.sensor;
        this.listAllMarkerZone = dmp.mapMarker;
        this.getListActifSensors();
    }

    getNumMarkerOutZone(){
        return this.listMarkerOutZone.length;
    }

    getNumListSensors(){
        return this.listSensors.length;
    }

    getNumListActifSensors(){
        return this.listActifSensors.length;
    }

    getNumListSensorsOnMap(){
        return this.listSensorsOnMap.length;
    }

    getNumListLowBatSensors(){
        return this.listLowBatSensors.length;
    }

    getListActifSensors(){
        this.sensorService.getListActifSensorsBySiteId({
            site_id: this.site.id
        }).subscribe((res)=>{
            if(res.success === true){
                this.listActifSensors = res.data.list_actif_sensors;
                this.listSensors = res.data.list_sensors;
                this.listSensorsOnMap = res.data.list_sensors_on_map;
                this.listLowBatSensors = res.data.list_low_bat_sensors;
                this.messageService.add(
                    {
                        severity: 'success',
                        summary: 'Information',
                        detail: res.msg
                    }
                );
            }else{
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Information',
                        detail: res.msg
                    }
                );
            }
        });
    }

    showMarkerOutDialog(){
        this.sensorOnMapTable = false;
        this.lastEmitTable = true;
        this.visible = false;
        this.tableTitle = "Liste des traqueurs hors du perimetre du site";
        this.listForTable = this.listSensorOutZone;
        console.log("table list: ", this.listForTable);
        this.visible = true;
    }

    showLowBatDialog(){
        this.sensorOnMapTable = false;
        this.lastEmitTable = true;
        this.visible = false;
        this.tableTitle = "Liste des traqueurs ayant la batterie faible";
        this.listForTable = this.listLowBatSensors;
        console.log("table list: ", this.listForTable);
        this.visible = true;
    }

    showListSensorsDialog(){
        this.sensorOnMapTable = false;
        this.lastEmitTable = false;
        this.visible = false;
        this.tableTitle = "Liste totale des traqueurs du site";
        this.listForTable = this.listSensors;
        console.log("table list: ", this.listForTable);
        this.visible = true;
    }

    showListSensorsOnMapDialog(){
        this.sensorOnMapTable = true;
        this.lastEmitTable = true;
        this.visible = false;
        this.tableTitle = "Liste totale des traqueurs present sur la map";
        this.listForTable = this.listSensorsOnMap;
        console.log("table list: ", this.listForTable);
        this.visible = true;
    }

    showListActifSensorsDialog(){
        this.sensorOnMapTable = false;
        this.lastEmitTable = true;
        this.visible = false;
        this.tableTitle = "Liste totale des traqueurs ayant emis une fois dans la journee";
        this.listForTable = this.listActifSensors;
        console.log("table list: ", this.listForTable);
        this.visible = true;
    }

    centerTheMap(longitude:number, latitude:number){
        this.visible = false;
        this.map.setView([latitude, longitude], 13);
    }

    centerTheMap2(longitude:number, latitude:number, marker:any){
        this.visible = false;
        this.map.setView([latitude, longitude], 13);
        marker.openPopup();
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

    getLocalDateTime(d:string){
        return utility.toLocalDateTime(d);

    }

    ngOnDestroy(): void{
        this.pusherService.unsubscribe();
    }

}

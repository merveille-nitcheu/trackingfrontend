import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { MapService } from 'src/app/demo/service/map.service';
import { PusherService } from 'src/app/demo/service/pusher.service';
import { SensorRecordService } from 'src/app/demo/service/sensor-record.service';
import { SensorService } from 'src/app/demo/service/sensor.service';
import { SiteService } from 'src/app/demo/service/site.service';
import { UserSiteService } from 'src/app/demo/service/user-site.service';
import * as L from 'leaflet';
import * as utility from '../../../utilities/utility';

@Component({
  selector: 'app-route-history',
  templateUrl: './route-history.component.html',
  styleUrl: './route-history.component.scss'
})
export class RouteHistoryComponent {

    user!: any;
    listSites!: any[];
    site!:any;
    listSensors!: any[];
    sensor!:any;
    loadingDropdownSite:boolean = false;
    loadingDropdownSensor:boolean = false;
    rangeDates: Date[] | undefined;
    maxDate: Date = new Date();
    dateStart!: Date;
    dateEnd!:Date;
    circle!:any;
    map!:any;
    battery:any
    listSensorsRecord: any[];
    listCoordinates:any[];
    listMarkerCircle:any[]=[];

    constructor(public authService: AuthService,
        public userSiteService: UserSiteService,
        public sensorService: SensorService,
        public mapService: MapService,
        public messageService: MessageService,
        public pusherService: PusherService,
        public siteService: SiteService,
        public sensorRecordService: SensorRecordService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(){
        this.user = this.authService.getUser();
        this.maxDate.setDate(this.maxDate.getDate()+1);
        this.getListSite();
        this.battery = this.mapService.convertBattery
    }

    ngAfterViewInit(): void {
       // this.initMap();
        console.log("site after init: ", this.site);
    }

    dropdrownSiteChangeFunction(event:any){
        console.log("site: ", this.site);
        this.loadingDropdownSite = true;
        if(this.site && this.site.sensors && this.site?.sensors.length > 0){
            this.listSensors = this.site.sensors;
            //this.sensor = this.site.sensors[0];
        }else{
            this.listSensors = [];
            this.messageService.add(
                {
                    severity: 'error',
                    summary: 'Information',
                    detail: "Pas de traqueurs pour ce site"
                }
            );
        }
        this.loadingDropdownSite = false;
        //this.getListSensorForSite();
        console.log("event dropdown: ", this.site);
    }

    dropdrownSensorChangeFunction(event:any){
        this.getListSensorRecordBysensorId();
    }

    rangeSelectFunction(event: any){
        //console.log("event date: ", event);
        if(this.rangeDates.length >= 2 && this.rangeDates[1] != null){
            //console.log("range 1 : ", this.rangeDates);
            let d1 = this.rangeDates[0];
            let d2 = this.rangeDates[1];
            this.dateStart = new Date(d1.setHours(0,0,1,1));
            this.dateEnd = new Date(d2.setHours(23,59,59,99));
        }else if(this.rangeDates.length >= 2 && this.rangeDates[1] == null){
            //console.log("range 2 : ", this.rangeDates);
            let d1 = this.rangeDates[0];
            let d2 = this.rangeDates[0];
            this.dateStart = new Date(d1.setHours(0,0,1,1));
            this.dateEnd = new Date(d2.setHours(23,59,59,99));
        }else{
            this.messageService.add(
                {
                    severity: 'error',
                    summary: 'Information',
                    detail: "Selectionnez une periode de date"
                }
            );
        }
        this.getListSensorRecordBysensorId();
    }

    getListSensorRecordBysensorId(){
        if(this.dateStart != null && this.dateEnd != null && this.sensor != null){
            this.sensorRecordService.getListSensorsRecordBySensorId({
                sensor_id: this.sensor.id,
                date_start: this.dateStart.toLocaleDateString().replaceAll("/","-")+" "+this.dateStart.toLocaleTimeString(),
                date_end: this.dateEnd.toLocaleDateString().replaceAll("/","-")+" "+this.dateEnd.toLocaleTimeString()
            }).subscribe((res)=>{
                this.listSensorsRecord = [];
                this.listMarkerCircle = [];
                console.log("res ", res);
                if(res.success == true){
                    if(res.data.list_records.length > 0){
                        this.listSensorsRecord = res.data.list_records;

                        this.messageService.add(
                            {
                                severity: 'info',
                                summary: 'Information',
                                detail: "Parcours charge avec succes"
                            }
                        );
                    }else{
                        this.messageService.add(
                            {
                                severity: 'warn',
                                summary: 'Information',
                                detail: "Aucun enregistrement disponible dans la periode"
                            }
                        );
                    }
                    this.initMap();
                    this.messageService.add(
                        {
                            severity: 'info',
                            summary: 'Information',
                            detail: res.msg
                        }
                    );

                }else{
                    this.messageService.add(
                        {
                            severity: 'error',
                            summary: 'Erreur',
                            detail: res.msg
                        }
                    );
                }
            });
        }
    }

    formListCoordinates(listSensorsRecord: any[]){
        this.listCoordinates = [];
        listSensorsRecord.forEach((sensorRecord)=>{
            this.listCoordinates.push([
                sensorRecord.latitude,
                sensorRecord.longitude
            ]);
        });
        return this.listCoordinates;
    }

    private removeMap() {
        // Retirer la carte de l'élément HTML
        this.map.remove(); // Supprime la carte de Leaflet
        this.map = null;
        document.getElementById('map').innerHTML = ''; // Vide le contenu de l'élément
    }


    private initMap(): void {
        if(this.map != null){
            this.removeMap();
        }
        if(this.site != null && this.listSensorsRecord?.length > 0){

            this.map = L.map('map', {
                center: [ this.site.latitude, this.site.longitude],
                zoom: 10
            });
            const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 20,
                minZoom: 6,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });
            this.map.zoomControl.setPosition('bottomright');
            tiles.addTo(this.map);
            const coordinates = this.formListCoordinates(this.listSensorsRecord);
            const polyline = L.polyline(coordinates, { color: '#00FF00' }).addTo(this.map);
            this.circle = this.mapService.addCircleWithRadiusToMap(this.site, this.map);
            this.listMarkerCircle = this.mapService.addManyCircleWithRadiusToMap(this.listSensorsRecord, this.map);
            console.log("list marker circle: ", this.listMarkerCircle);
            this.map.fitBounds(polyline.getBounds());
            this.messageService.add(
                {
                    severity: 'info',
                    summary: 'Information',
                    detail: "Map initialise avec succes"
                }
            );
        }

    }

    getListSite(){
        this.siteService.getListSitesForUser().subscribe((res)=>{
            if(res.success == true){
                this.listSites = res.data.list_sites;
                console.log("list site: ", this.listSites);
                if(this.listSites.length > 0){
                    //this.site = this.listSites[0];
                    //this.getListSensorForSite();
                }
            }
        });
    }

    getListSensorForSite(){
        this.sensorService.getListSensorsBySiteId({
            site_id: this.site.id
        }).subscribe((res)=>{
            if(res.success == true){
                console.log("res list sensors: ", res.data);
                this.listSensors = res.data.list_sensors;
                if(this.listSensors.length > 0){
                    this.sensor = this.listSensors[0];
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
            this.loadingDropdownSite = false;
        });
    }

    centerTheMap2(longitude:number, latitude:number, marker:any){
        this.map.setView([latitude, longitude], 20);
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


}

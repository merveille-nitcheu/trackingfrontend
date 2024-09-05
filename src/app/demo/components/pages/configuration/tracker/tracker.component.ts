import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { SensorService } from 'src/app/demo/service/sensor.service';
import { SiteService } from 'src/app/demo/service/site.service';
import { UserSiteService } from 'src/app/demo/service/user-site.service';
import * as utility from '../../../../utilities/utility';
import { MapService } from 'src/app/demo/service/map.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent {

    user!: any;
    listSites: any[]=[];
    site:any = {};
    subsite:any = {}
    selectedSite:any = {};
    subsiteforsite:any = {}

    listSensors!: any[];
    listSubSites!: any[]
    sensor!:any;
    submittedSensor:boolean = false;
    sensorDialog :boolean= false;

    loadingDropdownSite:boolean = false;
    loadingDropdownSensor:boolean = false;

    dialogSensorsTitle:string = "";
    dialogSensorsvisible:boolean = false;

    dialogEditSensorsTitle:string = "";
    dialogEditSensorsvisible:boolean = false;

    dialogLastSensorRecordTitle:string = "";
    lastSensorRecordDialog:boolean = false;
    lastSensorRecord!:any ;
    battery:any

    constructor(public authService: AuthService,
        public userSiteService: UserSiteService,
        public sensorService: SensorService,
        public messageService: MessageService,
        public mapService:MapService,
        public siteService: SiteService,
        public confirmationService: ConfirmationService
    ) { }

    ngOnInit(){
        this.user = this.authService.getUser();
        console.log("user: ", this.user);
        this.getListSite();
        this.battery= this.mapService.convertBattery
    }

    dropdrownSiteChangeFunction(event:any){
        console.log("site: ", this.site);
        this.loadingDropdownSite = true;

        if(this.site && this.site.child && this.site?.child.length > 0){
            this.listSensors = this.site.sensors;
            this.selectedSite = this.site;
            this.listSubSites =  this.site.child;
            //this.sensor = this.site.sensors[0];
        }else{
            this.listSubSites = [];
            this.messageService.add(
                {
                    severity: 'error',
                    summary: 'Information',
                    detail: "Pas de sous-sites pour ce site"
                }
            );
        }
        if (this.site && this.site.sensors && this.site.sensors.length > 0) {
            // Récupérer les capteurs du site principal
            this.listSensors = [...this.site.sensors];

            // Vérifier si le site a des sous-sites
            if (this.site.child && this.site.child.length > 0) {
                // Récupérer les capteurs de tous les sous-sites
                this.site.child.forEach(child => {
                    if (child.sensors && child.sensors.length > 0) {
                        this.listSensors = [
                            ...this.listSensors,
                            ...child.sensors
                        ];
                    }
                });
            }

            // Filtrer les duplications en utilisant un identifiant unique, par exemple `id`
            const uniqueSensors = this.listSensors.filter((sensor, index, self) =>
                index === self.findIndex((s) => s.id === sensor.id)
            );

            this.listSensors = uniqueSensors;
        }
        else{
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
        console.log("event dropdown: ", this.site);
    }

    dropdrownSubsiteChangeFunction(event:any){

        console.log("site: ", this.subsiteforsite);
        this.loadingDropdownSite = true;
        if(this.subsiteforsite && this.subsiteforsite.sensors && this.subsiteforsite?.sensors.length > 0){
            this.listSensors = this.subsiteforsite.sensors;
            this.selectedSite = this.subsiteforsite;
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
        console.log("event dropdown: ", this.subsiteforsite);
    }

    getListSite(){
        this.siteService.getListSitesForUser().subscribe((res)=>{
            if(res.success == true){
                this.listSites = res.data.list_sites;
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

    openNewSensor(){
        this.dialogEditSensorsTitle = "Creation d'un traqueur";
        this.sensor = {};
        this.submittedSensor = false;
        this.sensorDialog = true;
    }

    hideSensorDialog() {
        this.sensorDialog = false;
        this.submittedSensor = false;
    }

    editSensor(sensor:any){
        this.dialogEditSensorsTitle = "Modification du traqueur "+sensor.sensor_reference;
        let subsite
        this.listSites.forEach(site => {

            if (site.id === sensor.site_id) {
                subsite = site; // Attribuer l'ID du site
            }

            // Vérifier les sous-sites
            if (site.child && site.child.length > 0) {
                site.child.forEach(child => {
                    if (child.id === sensor.site_id) {
                        subsite = child; // Attribuer l'ID du sous-site
                    }
                });
            }
        });
        this.sensor = {
            "site_id" : sensor.site_id,
            "sensor_reference" : sensor.sensor_reference,
            "description" :sensor.description,
            "sensor_id" : sensor.id,
            "subsite" : subsite,
        }
        this.sensorDialog = true;
        console.log("sensor: ", this.sensor);
    }

    deleteSensor(sensor:any){
        this.confirmationService.confirm({
            message: 'Etes vous sur de vouloir supprimer ' + sensor.sensor_reference + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            reject: () => {
                this.messageService.add(
                    {
                        severity: 'warn',
                        summary: 'Information',
                        detail: "Processus de suppression annulee",
                        life: 3000
                    }
                );
            },
            rejectLabel: "Non",
            accept: () => {
                this.sensorService.deleteSensor({
                    sensor_id: sensor.id
                }).subscribe((res)=>{
                    if(res.success == true){
                        this.messageService.add(
                            {
                                severity: 'success',
                                summary: 'Successful',
                                detail: res.msg,
                                life: 3000
                            }
                        );
                        this.getListSensorBySiteId();;
                    }else{
                        this.messageService.add(
                            {
                                severity: 'error',
                                summary: 'Erreur',
                                detail: res.msg,
                                life: 3000
                            }
                        );
                    }
                });
            }
        });
    }

    saveSensor(){
        this.submittedSensor = true;
        console.log(this.subsite)
        if (this.sensor.sensor_reference?.trim()) {
            this.sensor.site_id = this.subsite.id;
            console.log("sensor for save: ", this.sensor);
            if (this.sensor.sensor_id) {
                this.sensorService.updateSensor(this.sensor).subscribe((res)=>{
                    if(res.success == true){
                        this.messageService.add(
                            { severity: 'success', summary: 'Successful', detail: res.msg, life: 3000 }
                        );
                    }else{
                        this.messageService.add(
                            { severity: 'error', summary: 'Error', detail: res.msg, life: 3000 }
                        );
                    }
                });

            } else {
                this.sensorService.storeSensor(this.sensor).subscribe((res)=>{
                    if(res.success == true){
                        this.messageService.add(
                            { severity: 'success', summary: 'Successful', detail: res.msg, life: 3000 }
                        );
                    }else{
                        this.messageService.add(
                            { severity: 'error', summary: 'Successful', detail: res.msg, life: 3000 }
                        );
                    }
                });
            }
            this.getListSensorBySiteId();
            this.sensorDialog = false;
            this.sensor = {};
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

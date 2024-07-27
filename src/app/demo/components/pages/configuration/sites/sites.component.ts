import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { SensorService } from 'src/app/demo/service/sensor.service';
import { SiteService } from 'src/app/demo/service/site.service';
import { UserSiteService } from 'src/app/demo/service/user-site.service';
import * as utility from '../../../../utilities/utility';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.scss'
})
export class SitesComponent {

    user!: any;
    listSites: any[]=[];
    site:any = {};
    selectedSite:any = {};

    listSensors!: any[];
    sensor!:any;
    submittedSensor:boolean = false;
    sensorDialog :boolean= false;

    loadingDropdownSite:boolean = false;
    loadingDropdownSensor:boolean = false;

    dialogSensorsTitle:string = "";
    dialogSensorsvisible:boolean = false;

    dialogEditSensorsTitle:string = "";
    dialogEditSensorsvisible:boolean = false;


    dialogEditSitesTitle:string = "";
    siteDialog:boolean = false;
    submittedSite:boolean = false;

    dialogLastSensorRecordTitle:string = "";
    lastSensorRecordDialog:boolean = false;
    lastSensorRecord!:any ;


    constructor(public authService: AuthService,
        public userSiteService: UserSiteService,
        public sensorService: SensorService,
        public messageService: MessageService,
        public siteService: SiteService,
        public confirmationService: ConfirmationService
    ) { }

    ngOnInit(){
        this.user = this.authService.getUser();
        console.log("user: ", this.user);
        this.getListSite();
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
        console.log("event dropdown: ", this.site);
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

    showListSensors(site: any){
        console.log("site: ", site);
        this.selectedSite = site;
        this.dialogSensorsTitle = "Liste des traqueurs";
        if(site.sensors && site.sensors.length > 0){
            this.listSensors = site.sensors;
        }else{
            this.listSensors = [];
        }
        this.dialogSensorsvisible = true;
    }

    openNewSite() {
        this.dialogEditSitesTitle = "Creation d'un site";
        this.site = {};
        this.submittedSite = false;
        this.siteDialog = true;
    }

    openNewSensor(){
        this.dialogEditSensorsTitle = "Creation d'un traqueur";
        this.sensor = {};
        this.submittedSensor = false;
        this.sensorDialog = true;
    }

    editSite(site: any) {
        this.dialogEditSitesTitle = "Modification du site "+site.name;
        this.site = {
            "site_id" : site.id ,
            "name" : site.name,
            "description" :site.description,
            "address" : site.address,
            "radius" :site.radius,
            "longitude" : site.longitude,
            "latitude" : site.latitude,
            "gmt" : site.gmt,
            "compagny_id" : site.compagny_id
        }
        this.siteDialog = true;
    }

    deleteSite(site: any) {
        this.confirmationService.confirm({
            message: 'Etes vous sur de vouloir supprimer ' + site.name + '?',
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
                this.siteService.deleteSite({
                    site_id: site.id
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
                        this.getListSite();
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

    saveSite() {
        this.submittedSite = true;
        if (this.site.name?.trim()) {
            this.site.compagny_id = this.user.compagny_id;
            console.log("site for save: ", this.site);
            if (this.site.site_id) {
                this.siteService.updateSite(this.site).subscribe((res)=>{
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
                this.siteService.storeSite(this.site).subscribe((res)=>{
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
            }
            this.getListSite();
            this.siteDialog = false;
            this.site = {};
        }
    }

    hideSiteDialog() {
        this.siteDialog = false;
        this.submittedSite = false;
    }

    hideSensorDialog() {
        this.sensorDialog = false;
        this.submittedSensor = false;
    }

    editSensor(sensor:any){
        this.dialogEditSensorsTitle = "Modification du traqueur "+sensor.sensor_reference;
        this.sensor = {
            "site_id" : sensor.site_id,
            "sensor_reference" : sensor.sensor_reference,
            "description" :sensor.description,
            "sensor_id" : sensor.id,
        }
        this.sensorDialog = true;
        console.log("sensor: ", sensor);
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
        if (this.sensor.sensor_reference?.trim()) {
            this.sensor.site_id = this.selectedSite.id;
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
        if(sensor.sensor_records.length > 0){
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

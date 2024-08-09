import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { SensorService } from 'src/app/demo/service/sensor.service';
import { SiteService } from 'src/app/demo/service/site.service';
import { UserSiteService } from 'src/app/demo/service/user-site.service';

@Component({
  selector: 'app-app-parameters',
  templateUrl: './app-parameters.component.html',
  styleUrl: './app-parameters.component.scss'
})
export class AppParametersComponent {
    user!: any;
    listSites: any[]=[];
    site:any = {};
    selectedSite:any = {};

    loadingDropdownSite:boolean = false;

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
        /* if(this.site && this.site.sensors && this.site?.sensors.length > 0){
            this.listSensors = this.site.sensors;
            this.selectedSite = this.site;
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
        } */
        this.loadingDropdownSite = false;
        console.log("event dropdown: ", this.site);
    }

    getListSite(){
        this.siteService.getListSitesForUser().subscribe((res: { success: boolean; data: { list_sites: any[]; }; msg: any; })=>{
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
}

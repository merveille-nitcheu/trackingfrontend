import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth.service';
import { SensorService } from 'src/app/demo/service/sensor.service';
import { SiteService } from 'src/app/demo/service/site.service';
import { UserSiteService } from 'src/app/demo/service/user-site.service';
import * as utility from '../../../../utilities/utility';



@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrl: './marker.component.scss'
})



export class MarkerComponent {

    site:any = {};
    listSites: any[]=[];
    selectedSite:any = {};
    loadingDropdownSite:boolean = false;
    user:any= {}
    color: string | undefined;
    TrakerType: any
    traker:any ={}


    markers = [
        { label: 'Traqueurs Actif', icon: 'pi pi-fw pi-align-justify', code:'AC' },
        { label: 'Traqueurs Batterie Faible', icon: 'pi pi-fw pi-bolt', code:'LB' },
        { label: 'Traqueurs Hors limite', icon: 'pi pi-fw pi-external-link', code:'OL' },
        { label: 'Traqueurs Eteints', icon: 'pi pi-fw pi-power-off', code:'OFF' },

    ];


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
        this.color = '23000000'


    }



    onColorChange(color) {
        this.color= '23' + color.value.substring(1)

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



    trakerType(marker){
        this.TrakerType = marker
    }

    AddColorTraker(){

       let  traker =
        {
            'color' : this.color,
            'trakerType': this.TrakerType,
            'site':this.site
        }
        console.log(traker)
        this.siteService.addTrakerColor(traker).subscribe((res)=>{
            if(res.success == true){
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

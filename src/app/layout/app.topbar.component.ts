import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../demo/service/auth.service';
import { UserSiteService } from '../demo/service/user-site.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    user!: any;
    role!: any;
    userSite!: any;
    titleTopBar:string = "Role de l'utilisateur";
    titleTooltipTopBar:string = "";
    loading:boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                public authService: AuthService,
                public userSiteService: UserSiteService,
                private cookieService: CookieService,
                private messageService: MessageService,
                public confirmationService: ConfirmationService,
                private router: Router
    ) { }

    ngOnInit(){
        this.user = this.authService.getUser();
        this.role = this.authService.getRole();
        ///this.getSite();
    }

    getSite(){
        this.userSiteService.getUserSiteByUserId({
            user_id: this.user.id
        }).subscribe((res)=>{
            if(res.success === true){
                this.userSite = res.data.user_site;
                this.titleTopBar = this.userSite.site.name;
                this.titleTooltipTopBar = this.userSite.site.description;
            }else{
                this.titleTopBar = "";
                this.titleTooltipTopBar = "";
            }
        });
    }

    logout(){
        this.confirmationService.confirm({
            message: 'Etes vous certain de vouloir vous deconnecter ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.loading=true;
                this.authService.logout().subscribe((res)=>{
                    this.loading = false;
                    if(res.success == true){
                        this.cookieService.deleteAll();
                        this.router.navigateByUrl("/");
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
            },
            reject: () => {
                this.messageService.add(
                    {
                        severity: 'info',
                        summary: 'Information',
                        detail: "Annulation de la deconnexion"
                    }
                );
            }
        });
    }
}

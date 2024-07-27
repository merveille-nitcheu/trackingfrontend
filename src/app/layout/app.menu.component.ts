import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/service/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,
                private authService: AuthService,
                private messageService: MessageService,
                private cookieService: CookieService,
                public confirmationService: ConfirmationService,
                private router: Router
    ) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/work/dashboard']
                    }
                ]
            },

            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Historique des parcours',
                        icon: 'pi pi-fw pi-map',
                        routerLink: ['/work/pages/route-history']
                    },

                    {
                        label: 'Configuration',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: "sites",
                                icon: 'pi pi-fw pi-globe',
                                routerLink: ['/work/pages/configuration/site']
                            },
                            {
                                label: 'betes',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/work/pages/configuration/tracker']
                            }
                        ]
                    },

                    {
                        label: 'Administration',
                        icon: 'pi pi-fw pi-book',
                        items: [
                            {
                                label: "Geolocalisation des sites",
                                icon: 'pi pi-fw pi-map-marker',
                                routerLink: ['/work/pages/administration/geolocation-site']
                            },
                            {
                                label: 'Utilisateurs',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/work/pages/administration/admin-user']
                            }
                        ]
                    },

                    {
                        label: 'Alertes et Notifications',
                        icon: 'pi pi-fw pi-bell',
                        items: [
                            {
                                label: "Alertes",
                                icon: 'pi pi-fw pi-exclamation-triangle',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Notifications',
                                icon: 'pi pi-fw pi-exclamation-circle',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                ]
            },
            {
                label: 'Profil',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: "Parametres d'utilisateur",
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/work/pages/profil/user-parameters']
                    },
                    {
                        label: 'Deconnexion',
                        icon: 'pi pi-fw pi-sign-out',
                        routerLink: ['/work/pages/profil/deconnexion']
                        /* command: () => {
                            this.logout();
                        } */
                    }
                ]
            },

        ];
    }

    logout(){
        this.confirmationService.confirm({
            message: 'Etes vous certain de vouloir vous deconnecter ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.authService.logout().subscribe((res)=>{
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
                this.messageService.add(
                    {
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Deleted',
                        life: 3000
                    }
                );
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
